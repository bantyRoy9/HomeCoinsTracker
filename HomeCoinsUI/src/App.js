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

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserDetails = async () => {
    const details = await AsyncStorage.multiGet(["cookie", "isGroupIncluded", "isActive"]);
    setUserDetails({
      cookie: details[0][1],
      isGroupIncluded: details[1][1]?.toLowerCase() === 'true',
      isActive: details[2][1]?.toLowerCase() === 'true'
    });
  };
  
  const { user } = useSelector(state=>state.user);
  const { group } = useSelector(state=>state.group);

  useEffect(() => {
    fetchUserDetails().then(() => {
      SplashScreen.hide();
    });
  }, [user,group]);

  return (
    <NavigationContainer>
      {userDetails ? <AppNavigator userDetails={userDetails} /> : null}
    </NavigationContainer>
  );
};

export default App;
