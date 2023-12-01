/**
 *
 * @BANTI
 */
import React, { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Activity, AddEarn, AddExpend, CreateGroup, EditProfile, Home, Login, Members, Profile, Signup } from './Screens';
import { FontAwesome, FontAwesome5 } from './Utils';
import { useTheme } from 'react-native-paper';
import OtpVerification from './Screens/Users/OtpVerification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
function App() {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme();
  const [userDetails, setUserDetails] = useState({});
  const { user } = useSelector(state=>state.user)
  useEffect(() => {
    console.log(user);
    if(user && Object.keys(user).length){
      setUserDetails({...userDetails,isGroupIncluded:user.isGroupIncluded,isActive:user.isActive });
    }else{
    }
    fetchUserDetail();
    setTimeout(()=>{
      SplashScreen.hide();
    },500);
  }, [user]);
  const fetchUserDetail = async () => {
    let userDetail = await AsyncStorage.multiGet(["cookie","isGroupIncluded","isActive"]);
    setUserDetails({ cookie:userDetail[0][1], isGroupIncluded:userDetail[1][1]?.toLowerCase?.() === 'true',isActive:userDetail[2][1]?.toLowerCase?.() === 'true' });
  };
  console.log(userDetails);
  const navigationOptions = {
    headerTintColor: colors.text,
    headerStyle: {
      backgroundColor: colors.headerBg,
      borderBottomColor: colors.headerBg,
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      fontSize: 21,
    }
  };
  const headerTitle = {
    home: { title: 'Dashboard' },
    addExpend: { title: 'Add Expend' },
    addEarn: { title: 'Add Earn' },
    profile: { title: 'Profile' },
    editProfile: { title: 'Edit Profile' },
    activity: { title: 'Activity' },
    members: { title: 'Members' },
    createGroup: { title: 'Create Group' },
    otpVerification: { title: 'User Verification' }
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
      <FontAwesome5 name='user-edit' size={25} onPress={editProfile} color={colors.text} />
    </>,
    createProfile: <>
      <TouchableOpacity >
        <FontAwesome5 name='user' size={25} color={colors.text} onPress={() => navigation.navigate('Profile')} />
      </TouchableOpacity>
    </>
  }
  return (

    <NavigationContainer >
      {/* <Stack.Navigator initialRouteName={(isAuthenticated && user && user.isActive && user?.isGroupIncluded) ? "Home" : (isAuthenticated && user && user.isActive) ? "CreateGroup" : (isAuthenticated && user && !user.isActive) ? "OtpVerification" : "Login"}> */}
      <Stack.Navigator initialRouteName={(userDetails.cookie && userDetails.isGroupIncluded) ? "Home" : userDetails.cookie ? "CreateGroup" : "Login"}>
        {(userDetails.cookie && userDetails.isGroupIncluded) ? <>
          <Stack.Screen name='Home' component={Home} options={{ ...navigationOptions, ...headerTitle.home, headerRight: () => headerIcons.home }} />
          <Stack.Screen name='AddEarn' component={AddEarn} options={{ ...navigationOptions, ...headerTitle.addEarn }} />
          <Stack.Screen name='AddExpend' component={AddExpend} options={{ ...navigationOptions, ...headerTitle.addExpend }} />
          <Stack.Screen name='Activity' component={Activity} options={{ ...navigationOptions, ...headerTitle.activity }} />
          <Stack.Screen name='Members' component={Members} options={{ ...navigationOptions, ...headerTitle.members }} />
          <Stack.Screen name='Profile' component={Profile} options={{ ...navigationOptions, ...headerTitle.profile, headerRight: () => headerIcons.profile }} />
          <Stack.Screen name='EditProfile' component={EditProfile} options={{ ...navigationOptions, ...headerTitle.editProfile }} />
        </> : userDetails.cookie ? <>
          <Stack.Screen name='CreateGroup' component={CreateGroup}
            options={({ navigation }) => ({
              ...navigationOptions,
              ...headerTitle.createGroup,
              headerRight: () => (
                <>
                  <Pressable onPress={() => navigation.navigate('Profile')}>
                    <FontAwesome5 name='user' size={25} color={colors.text} />
                  </Pressable>
                </>
              )
            })
            } />
          <Stack.Screen name='CreateNewGroup' component={CreateGroup} options={navigationOptions} />
          <Stack.Screen name='ExistingGroup' component={CreateGroup} options={navigationOptions} />
          <Stack.Screen name='Profile' component={Profile} options={{ ...navigationOptions, ...headerTitle.profile, headerRight: () => headerIcons.profile }} />
          <Stack.Screen name='OtpVerification' component={OtpVerification} options={{ ...navigationOptions, ...headerTitle.otpVerification }} />
        </> : <>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name='OtpVerification' component={OtpVerification} options={{ ...navigationOptions, ...headerTitle.otpVerification }} />
        </>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
