import React, { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import notificationService from "../../Utils/Notification";
import { Button } from "react-native";
import io from 'socket.io-client'

const ChatWithFamily = () => {
    const [notifications, setNotifications] = useState([]);
    const userId = 'ram';
    const groupId = 'group1';

    useEffect(() => {
        // notificationService.initialize(userId, groupId);

        // notificationService.onNotification((message) => {
        //     setNotifications((prevNotifications) => [...prevNotifications, message]);
        // });

        // return () => {
        //     notificationService.disconnect();
        // };
        const socket = io('http://192.168.1.73:8000:8000'); // Replace with your server address
    
    socket.on('connection', (socket) => {
      console.log('Connected to server',socket);
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
    });

    return () => {
      socket.disconnect();
    };
    }, []);

    const handleSendNotification = () => {
        const message = 'Ram has expended some amount for some reason';
        notificationService.sendNotification(groupId, message);
    };

    return (
        <View>
            <Button title="Send Notification" onPress={handleSendNotification} />
            {notifications.map((notif, index) => (
                <Text key={index}>{notif}</Text>
            ))}
        </View>
    );
};


export default ChatWithFamily