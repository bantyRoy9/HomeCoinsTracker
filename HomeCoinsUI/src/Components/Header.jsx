import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { bottomHeaderList } from '../Utils';
import { useTheme } from 'react-native-paper';

const Header = ({ title }) => {
    const navigation = useNavigation();
    const { colors,dark} = useTheme()
    const backgroundStyle = {
        backgroundColor: colors.headerBg,
        color: colors.text,
        borderColor:colors.border
    };
    const navigatePage=(pageLink)=>{
        navigation.navigate(pageLink);
    };
    return (
        <View style={[styles.headerContainer,backgroundStyle]}>
            {bottomHeaderList && bottomHeaderList.map((headerLists,idx)=>(
                <View key={idx} style={{...styles.headerIcons,backgroundColor:headerLists.title==title?colors.border:""}}>
                    <Pressable style={styles.headerIcon} onPress={()=>navigatePage(headerLists.navUrl)}>
                        <Icons name={headerLists.iconName} size={22} color={backgroundStyle.color} />
                        <Text style={{color:backgroundStyle.color,fontSize:15}}>{headerLists.title}</Text>
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
        marginBottom:0
    },
    headerIcon:{
        alignItems:'center',
        paddingVertical: 10,
    },
    headerIcons: {
        flex:1
    }
})