import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { darkColorProps, lightColorProps, defaultStyle, FontAwesome } from '../../Utils';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../../Redux/Action/userAction';
import { useTheme } from 'react-native-paper';
const profileNavList = [{
    label: 'User Dashboard',
    onPress: 'userDashboard',
    Icons: ["dashboard"]
},
{
    label: 'Add Members',
    onPress: 'addMember',
    Icons: ["users"]
},
{
    label: 'Email Setting',
    onPress: 'emailSetting',
    Icons: ["envelope-o"]
}, {
    label: 'Notification Settings',
    onPress: 'notificationSetting',
    Icons: ["bell"]
}, {
    label: 'Password',
    onPress: 'passwordSetting',
    Icons: ["lock"]
}, {
    label: 'Logout',
    onPress: 'Logout',
    Icons: ["sign-out"]
},
]
const Profile = () => {
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({});
    const { colors,dark } = useTheme();
    const { user } = useSelector(state => state.user);
    const backgroudStyle = {
        backgroundColor: colors.background,
        color: colors.text
    };
    useEffect(() => {
        if (user) {
            setUserDetails(user)
        }
    }, []);

    const logout = async () => {
        await AsyncStorage.clear();
        dispatch(logoutUser())
    };
    const onPressprofileNav = (forPress) => {
        switch (forPress) {
            case 'Logout':
                logout();
            default:
                break;
        }
    }
    return (
        <SafeAreaView style={{ ...backgroudStyle, height: '100%' }}>
            <StatusBar barStyle={dark?'light-content':'dark-content'} backgroundColor={backgroudStyle.backgroundColor} />
            <View style={defaultStyle.screenContainer}>
                <View style={{...styles.profileViewSection,borderColor:colors.border}}>
                    <View style={styles.profileDetails}>
                        <View style={styles.profilePhoto}>
                            <Image source={require('../../../Assets/profiles/default.png')}
                                style={{ width: '100%', height: '100%', borderRadius: 50 }}
                            />
                        </View>
                        <View style={styles.profileDetail}>
                            <View><Text style={{ ...styles.profileText, ...styles.profileDetailText, color: colors.text }}>{userDetails?.name?.toUpperCase() ?? 'NA'}</Text></View>
                            <View><Text style={{ ...styles.profileText, color: colors.text }}>UserId: {userDetails?.userId ?? 'NA'}</Text></View>
                        </View>
                    </View>
                    <View style={styles.profileContactDetails}>
                        <View style={styles.profileContactDetail}>
                            <FontAwesome name='phone' size={25} color={colors.text}/>
                            <Text style={{ ...styles.profileText, ...styles.profileContactDetailText,color:colors.text}}>+91 {userDetails?.mobile ?? 'NA'}</Text>
                        </View>
                        <View style={styles.profileContactDetail}>
                            <FontAwesome name='envelope-o' size={25} color={colors.text}/>
                            <Text style={{ ...styles.profileText, ...styles.profileContactDetailText,color:colors.text }}>{userDetails?.email ?? 'NA'}</Text>
                        </View>
                    </View>
                    <View style={styles.profileAccountDetails}>
                        <View style={styles.profileAccountDetail}>
                            <View style={styles.profileAccountTests}>
                                <Text style={{ ...styles.profileText, ...styles.profileAccountText,color:colors.text }}>{user?.totalEarn?.reduce((a, b) => a + b?.amount, 0)}</Text>
                                <Text style={{color:colors.text}}>Total Earn</Text>
                            </View>
                            <View style={styles.profileAccountTests}>
                                <Text style={{ ...styles.profileText, ...styles.profileAccountText,color:colors.text }}>{user?.totalExpend?.reduce((a, b) => a + b?.amount, 0)}</Text>
                                <Text style={{color:colors.text}}>Total Expend</Text>
                            </View>
                            <View style={styles.profileAccountTests}>
                                <Text style={{ ...styles.profileText, ...styles.profileAccountText,color:colors.text }}>{user?.totalEarn?.reduce((a, b) => a + b?.amount, 0) - user?.totalExpend?.reduce((a, b) => a + b?.amount, 0)}</Text>
                                <Text style={{color:colors.text}}>Total Savings</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View>
                        {profileNavList.map(nav => (
                            <Pressable key={nav.label} style={{ ...styles.profileNavLists, borderColor: colors.border }} onPress={() => onPressprofileNav(nav.onPress)}>
                                <View style={styles.profileNavList}>
                                    <View><FontAwesome name={nav?.Icons[0]} size={25} color={colors.text}/></View>
                                    <View><Text style={{ ...styles.profileText, ...styles.profileContactDetailText,color:colors.text }}>{nav?.label}</Text></View>
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
    profileViewSection: {
        borderBottomWidth: 1,
        borderColor: '#3d3d3d',
        paddingVertical: 10
    },
    profileDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    profilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileDetail: {
        marginLeft: 10,
    },
    profileContactDetails: {
        // borderWidth:1,
        // borderColor:'red'
    },
    profileContactDetail: {
        flexDirection: 'row',
        paddingHorizontal: 18,
        marginVertical: 15,
        alignItems: 'center',
    },
    profileText: {
        fontSize: 16,
    },
    profileDetailText: {
        fontSize: 25,
        fontWeight: '600',
    },
    profileContactDetailText: {
        marginHorizontal: 15
    },
    profileAccountDetails: {
        padding: 10,
    },
    profileAccountDetail: {
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    profileAccountTests: {
        alignItems: 'center'
    },
    profileAccountText: {
        fontWeight: '800',
        fontSize: 25
    },
    // profileEditIcon:{
    //     position:'absolute',
    //     padding:8,
    //     right:0
    // }
    profileNavLists: {
        borderBottomWidth: .1,
        padding: 15
    },
    profileNavList: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})