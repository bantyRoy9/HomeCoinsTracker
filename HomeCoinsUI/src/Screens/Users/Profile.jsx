import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import Input from '../../Components/Input';
import Header from '../../Components/Header';
import { defaultStyle } from '../../Utils/defaultCss';
import FontIcons from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '../../Utils/VectorIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../../Redux/Action/userAction';
const profileNavList=[{
        label:'User Dashboard',
        onPress:'userDashboard',
        Icons:["dashboard"]
    },
    {
        label:'Add Members',
        onPress:'addMember',
        Icons:["users"]
    },
    {
        label:'Email Setting',
        onPress:'emailSetting',
        Icons:["envelope-o"]
    },{
        label:'Notification Settings',
        onPress:'notificationSetting',
        Icons:["bell"]
    },{
        label:'Password',
        onPress:'passwordSetting',
        Icons:["lock"]
    },{
        label:'Logout',
        onPress:'Logout',
        Icons:["sign-out"]
    },
]
const Profile = () => {
    const isDarkMode = useColorScheme() == 'dark';
    const dispatch = useDispatch();
    const [userDetails,setUserDetails] = useState({});
    const navigation = useNavigation();
    const { user } = useSelector(state=>state.user);
    const backgroudStyle = {
        backgroundColor:isDarkMode?darkColorProps.background:lightColorProps.background,
        color:isDarkMode?darkColorProps.textColor:lightColorProps.textColor
    };
    useEffect(()=>{
        if(user){
            setUserDetails(user)
        }
    },[])
    const changeHandler =(name,value)=>{
        setUserDetails({ ...userDetails,[name]:value});
    };
    const logout = async()=>{
        await AsyncStorage.clear();
        dispatch(logoutUser())
    }
    const onPressprofileNav = (forPress) =>{
        switch(forPress){
            case 'Logout':
            logout();
            default:
                break;
        }
      }
  return (
    <SafeAreaView style={{...backgroudStyle,height:'100%'}}>
        <StatusBar barStyle={backgroudStyle.color} backgroundColor={backgroudStyle.backgroundColor}/>
        <View style={defaultStyle.screenContainer}>
            <View style={styles.profileViewSection}>
                <View style={styles.profileDetails}>
                    <View style={styles.profilePhoto}>
                        
                    </View>
                    <View style={styles.profileDetail}>
                        <View><Text style={{...styles.profileText, ...styles.profileDetailText}}>{userDetails?.name?.toUpperCase()??'NA'}</Text></View>
                        <View><Text style={styles.profileText}>UserId: {userDetails?.userId??'NA'}</Text></View>
                    </View>
                    {/* <View style={styles.profileEditIcon}><FontIcons name={'edit'} size={25}/></View> */}
                </View>
                <View style={styles.profileContactDetails}>
                    <View style={styles.profileContactDetail}>
                        <View>
                            <FontIcons name='phone' size={25}/>
                        </View>
                        <View>
                            <Text style={{...styles.profileText,...styles.profileContactDetailText}}>+91 {userDetails?.mobile??'NA'}</Text>
                        </View>
                    </View>
                    <View style={styles.profileContactDetail}>
                        <View>
                            <FontIcons name='envelope-o' size={25}/>
                        </View>
                        <View>
                            <Text style={{...styles.profileText,...styles.profileContactDetailText}}>{userDetails?.email??'NA'}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.profileAccountDetails}>
                    <View style={styles.profileAccountDetail}>
                        <View style={styles.profileAccountTests}>
                            <Text style={{...styles.profileText,...styles.profileAccountText}}>{user?.totalEarn.reduce((a,b)=>a + b?.amount,0)}</Text>
                            <Text>Total Earn</Text>
                        </View>
                        <View style={styles.profileAccountTests}>
                            <Text style={{...styles.profileText,...styles.profileAccountText}}>{user?.totalExpend.reduce((a,b)=>a + b?.amount,0)}</Text>
                            <Text>Total Expend</Text>
                        </View>
                        <View style={styles.profileAccountTests}>
                            <Text style={{...styles.profileText,...styles.profileAccountText}}>{user?.totalEarn.reduce((a,b)=>a + b?.amount,0) - user?.totalExpend.reduce((a,b)=>a + b?.amount,0)}</Text>
                            <Text>Total Savings</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View>
                {profileNavList.map(nav=>(
                    <Pressable key={nav.label} style={{...styles.profileNavLists,borderColor:isDarkMode?darkColorProps.borderColor:lightColorProps.borderColor}} onPress={()=>onPressprofileNav(nav.onPress)}>
                        <View style={styles.profileNavList}>
                            <View><FontAwesome name={nav?.Icons[0]} size={25}/></View>
                            <View><Text style={{...styles.profileText,...styles.profileContactDetailText}}>{nav?.label}</Text></View>
                        </View>
                    </Pressable>
                ))}
                    </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    profileViewSection:{
        borderBottomWidth:1,
        borderColor:'#3d3d3d',
        paddingVertical:10
    },
    profileDetails:{
        flexDirection:'row',
        alignItems:'center',
        position:'relative'
    },
    profilePhoto:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:'#3d3d3d',
        borderWidth:1
    },
    profileDetail:{
        // borderWidth:1,
        // borderColor:'green',
        marginLeft:10,
    },
    profileContactDetails:{
        // borderWidth:1,
        // borderColor:'red'
    },
    profileContactDetail:{
        flexDirection:'row',
        paddingHorizontal:18,
        marginVertical:15,
        alignItems:'center',
    },
    profileText:{
        fontSize:16,
    },  
    profileDetailText:{
        fontSize:25,
        fontWeight:'600',
    },
    profileContactDetailText:{
        marginHorizontal:15
    },
    profileAccountDetails:{
        padding:10,
    },
    profileAccountDetail:{
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    profileAccountTests:{
        alignItems:'center'
    },
    profileAccountText:{
        fontWeight:'800',
        fontSize:25
    },
    // profileEditIcon:{
    //     position:'absolute',
    //     padding:8,
    //     right:0
    // }
    profileNavLists:{
        borderBottomWidth:.1,
        padding:15
    },
    profileNavList:{
        flexDirection:'row',
        alignItems:'center'
    }
})