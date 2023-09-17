import { StyleSheet, SafeAreaView, Text, View, useColorScheme, StatusBar, Pressable } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome';
import { darkColorProps, lightColorProps } from '../../src/Utils/colorProp';
import { defaultStyle } from '../../src/Utils/defaultCss';

const AddEarnExpens = () => {
    const isDarkMode = useColorScheme() == 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
        color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
    };

    return (
        <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
            <StatusBar backgroundColor={isDarkMode ? darkColorProps.background : lightColorProps.background}></StatusBar>
            <View style={defaultStyle.screenContainer}>
                <View style={defaultStyle.toHeaderContainer}>
                    <View>
                        <Text style={{ ...defaultStyle.topHeaderTitle, color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }}>Add Earn</Text>
                    </View>
                    <View style={{ position: 'relative' }}>
                        {/* <Text><Icons name='check' color={backgroundStyle.color} size={25} />Save</Text> */}
                            <Pressable style={{ ...defaultStyle.earnExpensBtn, ...styles.earnBtn }}>
                                <Text style={defaultStyle.earnExpensBtnText}><Icons name='check' size={16} />Save</Text>
                            </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddEarnExpens

const styles = StyleSheet.create({
    
  earnBtn:{
    backgroundColor:'green'
  },
})