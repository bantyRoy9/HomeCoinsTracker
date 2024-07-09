import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Activity, ChatWithFamily, Home, Members, Profile } from '../Screens';
import navigationOptions from './navigationOptions';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
    const theme = useTheme();
    const options = navigationOptions(theme);
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarLabelPosition:'below-icon', tabBarActiveTintColor: theme.colors.text,tabBarActiveBackgroundColor:theme.colors.HeaderText,tabBarStyle:{backgroundColor:theme.colors.HeaderBg}}} sceneContainerStyle={{backgroundColor:'#3d3d3d'}}>
        <Tab.Screen name="Home" component={Home} options={{...options,title: 'Dashboard',   tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />)}}/>
        <Tab.Screen name="Members" component={Members} options={{...options,title: 'Members',   tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-group" color={color} size={size} />)}}/>
        <Tab.Screen name="Activity" component={Activity} options={{...options, title: 'Activity', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />)/*,tabBarBadge: 3*/}}/>
        <Tab.Screen name="Profile" component={Profile} options={{...options, title: 'Profile', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" color={color} size={size} />)}}/>
        <Tab.Screen name="ChartWithFamily" component={ChatWithFamily}  options={{...options,headerShown: false, title: 'Chart With Family', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="chat" color={color} size={size} />)}}/>
    </Tab.Navigator>
  );
}

export default BottomNavigator;
