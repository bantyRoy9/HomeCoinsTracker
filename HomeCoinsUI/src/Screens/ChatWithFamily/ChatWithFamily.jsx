import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View,Text,Pressable,SafeAreaView,FlatList,Button} from 'react-native';
import notificationService from '../../Utils/Notification';
import {useDispatch, useSelector} from 'react-redux';
import {Input} from '../../Components';

import axios from 'axios';
import {chatControllerURL, userControllerURL} from '../../Utils/URLProperties';
import {getAxiosHeader} from '../../Utils';
import moment from 'moment';

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

  // Fetch previous messages
  const fetchMessages = async () => {
    try {
      const {data} = await axios.get(`${chatControllerURL}/chat/${groupId}`,await getAxiosHeader());
      //console.log(data.data);
      setNotifications(data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
;

  const handleSendMessage = () => {
    notificationService.sendMessage(userId, message, groupId);
    setNotifications(prev=>([...prev,{message, groupId,senderId:user,createdAt:moment().format(),updatedAt:moment().format()}]))
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
              {item.senderId.name}: {item.message}
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
