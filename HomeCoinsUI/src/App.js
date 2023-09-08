/**
 *
 * @BANTI
 */

import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import Login from '../Screens/Users/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
function App(){  
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
