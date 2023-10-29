import { StyleSheet, Text, View, useColorScheme,Pressable } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { darkColorProps, lightColorProps } from '../Utils/colorProp';
import { useNavigation } from '@react-navigation/native';
import { bottomHeaderList } from '../Utils/homeNavList';
import { useTheme } from 'react-native-paper';

const Header = () => {
    const navigation = useNavigation();
    const { colors,dark} = useTheme()
    const backgroundStyle = {
        backgroundColor: colors.headerBg,
        color: colors.text,
        borderColor:colors.border
    }
    const navigatePage=(pageLink)=>{
        navigation.navigate(pageLink);
    };
    
    return (
        <View style={[styles.headerContainer,backgroundStyle]}>
            
            {bottomHeaderList && bottomHeaderList.map(headerLists=>(
                <View style={styles.headerIcons}>
                    <Pressable style={styles.headerIcon} onPress={()=>navigatePage(headerLists.navUrl)}>
                        <Icons name={headerLists.iconName} size={25} color={backgroundStyle.color} />
                        <Text style={{color:backgroundStyle.color}}>{headerLists.title}</Text>
                    </Pressable>
                </View>
            ))}
            
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth:1,
        // borderTopLeftRadius:12,
        // borderTopRightRadius:12
    },
    headerIcon:{
        alignItems:'center',
        paddingVertical: 10,
    },
    headerIcons: {
    }
})