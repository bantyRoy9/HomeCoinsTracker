import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View,Text,Pressable,SafeAreaView,FlatList,Button} from 'react-native';
import notificationService from '../../Utils/Notification';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from '../../Components';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {chatControllerURL, userControllerURL} from '../../Utils/URLProperties';
import {getAxiosHeader} from '../../Utils';

const ChatWithFamily = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [message, setMessages] = useState('');
  const {user} = useSelector(state => state.user);
  const userId = user?._id??"";
  const groupId = user?.groupId??"";
  // console.log(user);
  useEffect(() => {
    notificationService.initialize();
    notificationService.joinGroup(groupId);
    notificationService.newMessage(message => {
      setNotifications(prevNotifications => [...prevNotifications, message]);
    });
    fetchMessages();
    return () => {
      notificationService.disconnect();
    };
  }, [groupId, userId]);
  useEffect(()=>{
    if(user && !user.fcmtoken){
      updatefcmtoken();
    }
  },[]);
  // Fetch previous messages
  const fetchMessages = async () => {
    try {
      const {data} = await axios.get(`${chatControllerURL}/chat/${groupId}`,await getAxiosHeader());
      setNotifications(data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const updatefcmtoken = async() =>{
    try{
      let fcmtoken = await checkToken();
      // console.log(`${userControllerURL}/fcmtoken/${fcmtoken}`);
      const {data} = await axios.patch(`${userControllerURL}/fcmtoken/${fcmtoken}`);
      if(data){
        console.log(data);
      }
    }catch(err){
      console.log(err.response?.data.message??"something wrong happen");
    }
  }
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
       return fcmToken.toString()
    } 
   };
  const handleSendMessage = () => {
    notificationService.sendMessage(userId, message, groupId);
    setMessages('');
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View>
            <Text>
              {item.senderId}: {item.message}
            </Text>
          </View>
        )}
      />
      <Input
        value={message}
        onChangeText={setMessages}
        placeholder="Type a message"

        // style={{ borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatWithFamily;
