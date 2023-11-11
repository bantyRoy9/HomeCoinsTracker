/**
 *
 * @BANTI
 */
import React, { useEffect } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, logoutUser } from './Redux/Action/userAction';
import { Activity, AddEarn, AddExpend, CreateGroup, EditProfile, Home, Login, Members, Profile, Signup } from './Screens';
import { FontAwesome, FontAwesome5} from './Utils';
import { useTheme } from 'react-native-paper';
import OtpVerification from './Screens/Users/OtpVerification';
function App() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { isLoading, isAuthenticated,user } = useSelector(state => state.user);
 useEffect(() => {
   dispatch(getMe());
  }, []);
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
    home:{title:'Dashboard'},
    addExpend: { title: 'Add Expend' },
    addEarn: { title: 'Add Earn' },
    profile: { title: 'Profile' },
    editProfile: { title: 'Edit Profile' },
    activity:{ title: 'Activity'},
    members:{ title:'Members'},
    createGroup:{title:'Create Group'},
    otpVerification:{title:'OTP Verification'}
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
            <FontAwesome5 name='user-edit' size={25} onPress={editProfile} color={colors.text}/>
          </>,
    createProfile: <>
          <TouchableOpacity >
            <FontAwesome5 name='user' size={25} color={colors.text} onPress={()=> navigation.navigate('Profile')}/>
          </TouchableOpacity>
          </>
  }   
  
  return (
    
      <NavigationContainer >
        <Stack.Navigator initialRouteName={(isAuthenticated && user && user?.isGroupIncluded)?"Home":isAuthenticated?"CreateGroup":"Login"}>
          {(isAuthenticated && user && user?.isGroupIncluded) ? <>
            <Stack.Screen name='Home' component={Home} options={{ ...navigationOptions, ...headerTitle.home, headerRight:()=> headerIcons.home }} />
            <Stack.Screen name='AddEarn' component={AddEarn} options={{ ...navigationOptions, ...headerTitle.addEarn }} />
            <Stack.Screen name='AddExpend' component={AddExpend} options={{ ...navigationOptions, ...headerTitle.addExpend }} />
            <Stack.Screen name='Activity' component={Activity} options={{ ...navigationOptions,...headerTitle.activity}} />
            <Stack.Screen name='Members' component={Members} options={{ ...navigationOptions,...headerTitle.members}} />
            <Stack.Screen name='Profile' component={Profile} options={{ ...navigationOptions, ...headerTitle.profile, headerRight: () =>  headerIcons.profile}} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{ ...navigationOptions, ...headerTitle.editProfile }} />
          </> : isAuthenticated ? <>
            <Stack.Screen name='CreateGroup' component={CreateGroup} 
              options={({navigation}) => ({ 
                  ...navigationOptions,
                  ...headerTitle.createGroup,
                  headerRight: () => (
                    <>
                      <Pressable onPress={()=> navigation.navigate('Profile')}>
                          <FontAwesome5 name='user' size={25} color={colors.text} />
                      </Pressable>
                    </>
                  )   
                })
              }/>
            <Stack.Screen name='CreateNewGroup' component={CreateGroup} options={navigationOptions}/>
            <Stack.Screen name='ExistingGroup' component={CreateGroup} options={ navigationOptions}/>  
            <Stack.Screen name='Profile' component={Profile} options={{ ...navigationOptions, ...headerTitle.profile, headerRight: () =>  headerIcons.profile}} />
          </> : <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name='OtpVerification' component={OtpVerification} options={{...navigationOptions,...headerTitle.otpVerification}}/>
          </>}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
