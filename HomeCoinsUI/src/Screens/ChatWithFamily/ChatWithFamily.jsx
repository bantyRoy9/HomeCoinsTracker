import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View,Text,Pressable,SafeAreaView,FlatList,Button} from 'react-native';
import notificationService from '../../Utils/Notification';
import {useSelector} from 'react-redux';
import {Input} from '../../Components';
import axios from 'axios';
import {chatControllerURL} from '../../Utils/URLProperties';
import {getAxiosHeader} from '../../Utils';

const ChatWithFamily = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessages] = useState('');
  const {user} = useSelector(state => state.user);
  const userId = user._id;
  const groupId = user.groupId;
  useEffect(() => {
    console.log(groupId);
    notificationService.initialize();
    notificationService.joinGroup(groupId);
    notificationService.newMessage(message => {
      console.log(message, 'new Messages');
      setNotifications(prevNotifications => [...prevNotifications, message]);
    });

    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const {data} = await axios.get(
          `${chatControllerURL}/chat/${groupId}`,
          await getAxiosHeader(),
        );
        setNotifications(data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return () => {
      notificationService.disconnect();
    };
  }, [groupId, userId]);

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
