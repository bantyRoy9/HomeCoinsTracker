import { StyleSheet, Text, View, useColorScheme,Pressable } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { darkColorProps, lightColorProps } from '../Utils/colorProp';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = () => {
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() == 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
        color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
    }
    const navigatePage=(pageLink)=>{
        console.log(pageLink);
        navigation.navigate(pageLink);
    }
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerIcons}>
                <View style={styles.headerIcon}>
                    <Icons name='bank' size={25} color={backgroundStyle.color} />
                    <Text>Home</Text>
                </View>
            </View>
            <View style={styles.headerIcons}>
                <View style={styles.headerIcon}>
                    <Icons name='address-book-o' size={25} color={backgroundStyle.color} />
                    <Text>Record</Text>
                </View>
            </View>
            <View style={styles.headerIcons}>
                <View style={styles.headerIcon}>
                    <Icons name='list-ul' size={25} color={backgroundStyle.color} />
                    <Text>Activity</Text>
                </View>
            </View>
            <View style={styles.headerIcons}>
                <Pressable style={styles.headerIcon} onPress={()=>navigatePage('Profile')}>
                    <Icons name='user' size={25} color={backgroundStyle.color} />
                    <Text>Account</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        //borderWidth:1,
        borderColor: 'red',
        justifyContent: 'space-around',
        backgroundColor: '#000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerIcon:{
        alignItems:'center',
        // borderColor:'red',
        // borderWidth:1,
        paddingVertical: 15,
    },
    headerIcons: {
    }
})