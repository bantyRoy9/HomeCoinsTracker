/**
 *
 * @BANTI
 */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../Screens/Users/Login';
import Signup from '../Screens/Users/Signup'
import Home from '../Screens/Dashboard/Home';
import AddEarn from '../Screens/AddEarnExpens/AddEarn';
import { darkColorProps, lightColorProps } from './Utils/colorProp';
import { useColorScheme } from 'react-native';
import AddExpend from '../Screens/AddEarnExpens/AddExpend';
function App(){  
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() =='dark'
  const [initialRoute,setInitialRouteName] = useState('Login');
  useEffect(()=>{
    async function getCookie(){
      const cookie = await AsyncStorage.getItem('cookie');
      if(cookie !== null){
     //   console.log(cookie);
        setInitialRouteName("Home");
      }
    };
    getCookie();
  },[])
  const  navigationOptions = {
    headerTintColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor,
    headerStyle: {
      backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
      borderBottomColor: '#ffffff',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 18,
    },
  };
  const headerTitle = {
    addExpend: {title:'Add Expend'},
    addEarn: {title:'Add Earn'},
  }
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}} na/>
          <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='AddEarn' component={AddEarn} options={{...navigationOptions, ...headerTitle.addEarn}} />
          <Stack.Screen name='AddExpend' component={AddExpend} options={{...navigationOptions, ...headerTitle.addExpend}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
