/**
 *
 * @BANTI
 */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './Redux/Action/userAction';
import { Activity, AddEarn, AddExpend, EditProfile, Home, Login, Members, Profile, Signup } from './Screens';
import { FontAwesome, FontAwesome5} from './Utils';
import { useTheme } from 'react-native-paper';
function App() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  // const isDarkMode = useColorScheme() == 'dark'
  const [isDarkMode,setIsDarkMode] = useState(true)
  const { isLoading, isAuthenticated } = useSelector(state => state.user);
 useEffect(() => {
   dispatch(getMe());
  }, []);
  const navigationOptions = {
    headerTintColor: colors.text,
    headerStyle: {
      backgroundColor: colors.darkHeaderBg,
      borderBottomColor: '#f0f',
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 21,
    }
  };
  const headerTitle = {
    home:{title:'Dashboard'},
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
  const headerIcons = {
    home: <>
          <View style={{ position: 'relative' }}>
              <FontAwesome name='bell' color={colors.text} size={20} />
              <View style={{ position: 'absolute', width: 10, height: 10, borderRadius: 50, backgroundColor: colors.notification, right: 0 }}></View>
            </View>
          </>,
    profile: <>
      <FontAwesome5 name='user-edit' size={25} onPress={editProfile} />
    </>
  }   
  return (
    
      <NavigationContainer >
        <Stack.Navigator initialRouteName={isAuthenticated?"Home":"Login"}>
          {isAuthenticated ? <>
            <Stack.Screen name='Home' component={Home} options={{ ...navigationOptions, ...headerTitle.home, headerRight:()=> headerIcons.home }} />
            <Stack.Screen name='AddEarn' component={AddEarn} options={{ ...navigationOptions, ...headerTitle.addEarn }} />
            <Stack.Screen name='AddExpend' component={AddExpend} options={{ ...navigationOptions, ...headerTitle.addExpend }} />
            <Stack.Screen name='Activity' component={Activity} options={{ ...navigationOptions,...headerTitle.activity}} />
            <Stack.Screen name='Members' component={Members} options={{ ...navigationOptions,...headerTitle.members}} />
            <Stack.Screen name='Profile' component={Profile} options={{ ...navigationOptions, ...headerTitle.profile, headerRight: () =>  headerIcons.profile}} />
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
