import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { darkColorProps, lightColorProps } from '../Utils/colorProp';

const Header = () => {
    const isDarkMode = useColorScheme() == 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
        color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
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
                <View style={styles.headerIcon}>
                    <Icons name='user' size={25} color={backgroundStyle.color} />
                    <Text>Account</Text>
                </View>
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
        alignItems:'center'
    },
    headerIcons: {
        paddingVertical: 15,
    }
})