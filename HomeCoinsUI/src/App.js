/**
 * 
 * @BANTI_KUMAR
 */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './Navigation/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import { updatefcmtoken } from './Redux/Action/userAction';

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useSelector(state => state.user);
  const { group } = useSelector(state => state.group);

  useEffect(() => {
    fetchUserDetails().then(() => {
      SplashScreen.hide();
      requestUserPermission();
    }).then(() => {
      checkToken();
    });
  }, [user, group]);

  const fetchUserDetails = async () => {
    const details = await AsyncStorage.multiGet(["cookie", "isGroupIncluded", "isActive", "fcmtoken"]);
    setUserDetails({
      cookie: details[0][1],
      isGroupIncluded: details[1][1]?.toLowerCase() === 'true',
      isActive: details[2][1]?.toLowerCase() === 'true',
      fcmtoken: details[3][1] ?? ""
    });
  };

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('fcmtoken not matched->', fcmToken && userDetails && userDetails.fcmtoken !== fcmToken)
    if (fcmToken && userDetails && userDetails.fcmtoken != fcmToken) {
      await updatefcmtoken(fcmToken);
    }
  };
  // Request permission to receive notifications
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  // Listen to whether the token changes
  messaging().onTokenRefresh((token) => {
    console.log('New token:', token);
  });

  // Handle foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  return (
    <NavigationContainer>
      {userDetails ? <AppNavigator userDetails={userDetails} /> : null}
    </NavigationContainer>
  );
};

export default App;
