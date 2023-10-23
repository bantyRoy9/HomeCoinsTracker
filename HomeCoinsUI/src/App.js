/**
 *
 * @BANTI
 */
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
import { getMe } from './Redux/Action/userAction';
import { Activity, AddEarn, AddExpend, EditProfile, Home, Login, Members, Profile, Signup } from './Screens';
import { FontAwesome5, darkColorProps, lightColorProps } from './Utils';
function App() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() == 'dark'
  const { isLoading, isAuthenticated } = useSelector(state => state.user);
 useEffect(() => {
   dispatch(getMe());
  }, []);
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
    activity:{ title: 'Activity'},
    members:{ title:'Members'}
  }
  const editProfile = () => {
    // navigation.navigate('EditProfile');
  }   
  return (
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName={isAuthenticated?"Home":"Login"}>
          {isAuthenticated ? <>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='AddEarn' component={AddEarn} options={{ ...navigationOptions, ...headerTitle.addEarn }} />
            <Stack.Screen name='AddExpend' component={AddExpend} options={{ ...navigationOptions, ...headerTitle.addExpend }} />
            <Stack.Screen name='Activity' component={Activity} options={{ ...navigationOptions,...headerTitle.activity}} />
            <Stack.Screen name='Members' component={Members} options={{ ...navigationOptions,...headerTitle.members}} />
            <Stack.Screen name='Profile' component={Profile} options={{ ...navigationOptions, ...headerTitle.profile, headerRight: () => <FontAwesome5 name='user-edit' size={25} onPress={editProfile} /> }} />
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
