import { StatusBar, StyleSheet, Text, View, useColorScheme, SafeAreaView } from 'react-native'
import React from 'react'
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';


const Activity = () => {
    const isDarkMode = useColorScheme() == 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
        color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
    };
    return (
        <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
            <View>
                <Text>Activity</Text>
            </View>
        </SafeAreaView>
    )
}

export default Activity

const styles = StyleSheet.create({})