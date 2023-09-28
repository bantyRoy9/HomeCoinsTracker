/**
 *
 * @BANTI
 */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Screens/Users/Login';
import Signup from './Screens/Users/Signup'
import Home from './Screens/Dashboard/Home';
import AddEarn from './Screens/AddEarnExpens/AddEarn';
import { darkColorProps, lightColorProps } from './Utils/colorProp';
import { useColorScheme, ActivityIndicator,View } from 'react-native';
import AddExpend from './Screens/AddEarnExpens/AddExpend';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Redux/Store';
import Profile from './Screens/Users/Profile';
import FontIcons from 'react-native-vector-icons/FontAwesome5'
import EditProfile from './Screens/Users/EditProfile';
import { getMe } from './Redux/Action/userAction';
//import { useNavigation } from '@react-navigation/native';
function App() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() == 'dark'
  const { isLoading, isAuthenticated } = useSelector(state => state.user);
//  useEffect(() => {
   // dispatch(getMe());
  //}, []);
  const navigationOptions = {
    headerTintColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor,
    headerStyle: {
      backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
      borderBottomColor: '#f0f',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 18,
    }
  };
  const headerTitle = {
    addExpend: { title: 'Add Expend' },
    addEarn: { title: 'Add Earn' },
    profile: { title: 'Profile' },
    editProfile: { title: 'Edit Profile' },
  }
  const editProfile = () => {
    // navigation.navigate('EditProfile');
  }
  console.log(isAuthenticated);
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated?"Home":"Login"}>
          {isAuthenticated ? <>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='AddEarn' component={AddEarn} options={{ ...navigationOptions, ...headerTitle.addEarn }} />
            <Stack.Screen name='AddExpend' component={AddExpend} options={{ ...navigationOptions, ...headerTitle.addExpend }} />
            <Stack.Screen name='Profile' component={Profile} options={{ ...navigationOptions, ...headerTitle.profile, headerRight: () => <FontIcons name='user-edit' size={25} onPress={editProfile} /> }} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{ ...navigationOptions, ...headerTitle.editProfile }} />
          </> : <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
          </>}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
