import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Activity, Home, Members, Profile } from '../Screens';
import navigationOptions from './navigationOptions';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
    const theme = useTheme();
    const options = navigationOptions(theme);
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarActiveTintColor:  theme.colors.headerBg}}>
        <Tab.Screen name="Home" component={Home} options={{...options,title: 'Dashboard',   tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}/>
        <Tab.Screen name="Members" component={Members} options={{...options,title: 'Members',   tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-group" color={color} size={size} />)}}/>
        <Tab.Screen name="Activity" component={Activity} options={{...options, title: 'Updates', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="bell" color={color} size={size} />),tabBarBadge: 3}}/>
        <Tab.Screen name="Profile" component={Profile} options={{...options, title: 'Profile', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" color={color} size={size} />)}}/>
    </Tab.Navigator>
  );
}

export default BottomNavigator;
