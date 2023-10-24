import { StatusBar, StyleSheet, Text, View, Pressable, useColorScheme, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import { useDispatch, useSelector } from 'react-redux';
import { getActivity } from '../../Redux/Action/activityAction';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { defaultStyle } from '../../Utils/defaultCss';
import moment from 'moment';
import { stringTransform } from '../../Utils/HomeCommon';


const Activity = () => {
    const isDarkMode = useColorScheme() == 'dark';
    const dispatch = useDispatch();
    const backgroundStyle = {
        backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
        color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
    };
    const { isLoading, activity } = useSelector(state => state.activity);
    useEffect(() => {
        dispatch(getActivity());
    }, [dispatch]);
    console.log(isLoading, activity);
    return (
        <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
            {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={isDarkMode ? darkColorProps.loaderColor : lightColorProps.loaderColor} /></View> :
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    <View style={defaultStyle.screenContainer}>
                        {activity && activity.data && activity?.data.map((el, idx) => (
                            <>
                                <Pressable key={el._id} style={styles.activityLists}>
                                    <View style={styles.activityList}>
                                        <View style={styles.activityLeftSec}>
                                            <View style={styles.activityProfileList}>
                                                <Image source={require('../../../Assets/profiles/default.png')}
                                                    style={{ width: 40, height: 40, borderRadius: 50 }}
                                                />
                                            </View>
                                            <View>
                                                {el.Url == "/earn" && <>
                                                    <View><Text>Earn By</Text></View>
                                                    <View><Text>{stringTransform(el.addEarn.source,'c')}</Text></View>
                                                </>}
                                                {el.Url == "/expend" && <>
                                                    <View><Text>Expend to</Text></View>
                                                    <View><Text>{el.addExpend?.description ?? ''}</Text></View>
                                                </>}
                                            </View>
                                        </View>
                                        <View style={styles.activityRightSec}>
                                            <Text>{`${el.Url == "/expend" ? '- ₹' + el.addExpend?.amount ?? "NA" + '' : '- ₹' + el.addEarn?.amount ?? "NA" + ''} `}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <View>
                                            <Text>{el.date ? moment(el.date).format('DD MMM YY hh:mm a') : 'NA'}</Text>
                                        </View>
                                        <View>
                                            <Text style={defaultStyle.textBold}>{`${stringTransform(el.user.name, 'C')} `}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                                {activity.data.length - 1 > idx && <Divider style={{ borderBottomColor: backgroundStyle.color }} />}
                            </>
                        ))}
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Activity

const styles = StyleSheet.create({
    activityLists: {
        paddingVertical: 15,
        gap:10
        // borderColor: 'red',
        // borderWidth: 1
    },
    activityList: {
        flexDirection:'row',justifyContent:"space-between"
    },
    activityLeftSec:{
        flexDirection:'row',justifyContent:"space-between",gap:10
    },
    activityRightSec:{

    },
    activityProfileList: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#3d3d3d"
    },
})