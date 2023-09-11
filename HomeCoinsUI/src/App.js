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
function App(){  
  const Stack = createNativeStackNavigator();
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
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
          <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
