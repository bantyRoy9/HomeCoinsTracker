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
import { useColorScheme } from 'react-native';
import AddExpend from './Screens/AddEarnExpens/AddExpend';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import Profile from './Screens/Users/Profile';
import FontIcons from 'react-native-vector-icons/FontAwesome5'
import EditProfile from './Screens/Users/EditProfile';
//import { useNavigation } from '@react-navigation/native';
function App(){  
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() =='dark'
  const [isAuthenticated,setIsAuthenticated] = useState(false);
 // const navigation = useNavigation();
  useEffect(()=>{
    async function getCookie(){
      const cookie = await AsyncStorage.getItem('cookie');
      if(cookie !== null){
        setIsAuthenticated(true);
      }
    };
    getCookie();
  },[]);
  const  navigationOptions = {
    headerTintColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor,
    headerStyle: {
      backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
      borderBottomColor: '#ffffff',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 18,
    }
  };
  const headerTitle = {
    addExpend: {title:'Add Expend'},
    addEarn: {title:'Add Earn'},
    profile:{title:'Profile'},
    editProfile:{title:'Edit Profile'},
  }
  const editProfile =()=>{
   // navigation.navigate('EditProfile');
  }
  
  return (
    <Provider store={store}>
    <NavigationContainer>
        <Stack.Navigator initialRouteName={AsyncStorage.getItem('cookie') ? "Home" : "Login"}>
          <Stack.Screen name='Login' component={Login} options={{headerShown:false}} na/>
          <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
          <Stack.Screen name='AddEarn' component={AddEarn} options={{...navigationOptions, ...headerTitle.addEarn}} />
          <Stack.Screen name='AddExpend' component={AddExpend} options={{...navigationOptions, ...headerTitle.addExpend}} />
          <Stack.Screen name='Profile' component={Profile} options={{...navigationOptions, ...headerTitle.profile,headerRight:()=><FontIcons name='user-edit' size={25} onPress={editProfile}/>}} />
          <Stack.Screen name='EditProfile' component={EditProfile} options={{...navigationOptions, ...headerTitle.editProfile}} />
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
