import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationOptions from './navigationOptions';
import { useTheme } from 'react-native-paper';
import { HeaderRightButton } from '../Components';
import { Activity, AddEarn, AddExpend, CreateGroup, EditProfile, Home, Login, Members, OtpVerification, Profile, Signup } from '../Screens';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();
const AppNavigator = ({ userDetails }) => {
  const {colors} = useTheme();
  const options = navigationOptions(colors);
  const editProfile = () =>{

  };
  
  return (
    <Stack.Navigator initialRouteName={(userDetails.cookie && userDetails.isGroupIncluded) ? "Home" : userDetails.cookie ? "CreateGroup" : "Login"}>
      {userDetails.cookie && userDetails.isGroupIncluded ? (
        <>
            <Stack.Screen name="BottomNavigation" component={BottomNavigator} options={{ ...options, headerShown: false,title: 'Dashboard', headerRight: () => <HeaderRightButton iconName="bell" colors={colors} notification={true}/> }} />
            <Stack.Screen name='AddEarn' component={AddEarn} options={{ ...options, title: 'Add earn' }} />
            <Stack.Screen name='AddExpend' component={AddExpend} options={{ ...options, title: 'Add expend' }} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{ ...options, title: 'Edit profile' }} />
          {/* <Stack.Screen name="Home" component={Home} options={{ ...options, title: 'Dashboard', headerRight: () => <HeaderRightButton iconName="bell" theme={theme} notification={true}/> }} /> */}
          {/* <Stack.Screen name='Activity' component={Activity} options={{ ...options, title: 'Activity' }} /> */}
          {/* <Stack.Screen name='Member' component={Members} options={{ ...options, title: 'Members' }} /> */}
          {/* <Stack.Screen name='Profile' component={Profile} options={{ ...options, title: 'Profile', headerRight: () => <HeaderRightButton iconName="user-edit" onPress={editProfile} theme={theme}/> }} /> */}
        
        </>
      ) : userDetails.cookie ? (
        <>
          {/* Group creation or profile editing screens */}
          <Stack.Screen name="CreateGroup" component={CreateGroup} options={({navigation})=>({ ...options, title: 'Create Group',headerRight: ()=> <HeaderRightButton iconName="user" onPress={()=> navigation.navigate('Profile')} colors={colors}/> })}/>
          <Stack.Screen name="CreateNewGroup" component={CreateGroup} options={{...options,title:"Create new group"}} />
          <Stack.Screen name='ExistingGroup' component={CreateGroup} options={options} />
          <Stack.Screen name='Profile' component={Profile} options={{ ...options, title:"Profile", headerRight: () => <HeaderRightButton iconName="user-edit" onPress={editProfile} colors={colors} /> }} />
          <Stack.Screen name='OtpVerification' component={OtpVerification} options={{ ...options, title:"User verification" }} />
        </>
      ) : (
        <>
          {/* Authentication screens */}
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name='OtpVerification' component={OtpVerification} options={{ ...options, title:"User verification" }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
