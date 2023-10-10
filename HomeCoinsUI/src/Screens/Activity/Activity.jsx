import { StatusBar, StyleSheet, Text, View, Pressable, useColorScheme, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import { useDispatch, useSelector } from 'react-redux';
import { getActivity } from '../../Redux/Action/activityAction';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { defaultStyle } from '../../Utils/defaultCss';
import moment from 'moment';


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
                                <Pressable key={el._id} style={styles.activityList}>
                                    <View style={styles.activityProfileList}>
                                        <Image source={require('../../../Assets/profiles/default.png')}
                                            style={{ width: 30, height: 30,borderRadius:50 }}
                                        />
                                    </View>
                                    <View style={styles.activityListTexts}>
                                        <View style={styles.activityText}>
                                            <View><Text>{`${el.user.name.charAt(0).toUpperCase() + el.user.name.slice(1)} `}</Text></View>
                                            <View><Text>{`${el.methodType === 'POST' ? 'add' : 'Type - NA'} `}</Text></View>
                                            <View><Text>{`${el.addExpend && el.addExpend.amount ? '₹' + el.addExpend.amount + ' expend to ' + el.addExpend?.description ?? '' : ''} `}</Text></View>
                                            <View><Text>{`${el.addEarn && el.addEarn.amount ? '₹' + el.addEarn.amount + ' earn by ' + el.addEarn.source : ''} `}</Text></View>
                                        </View>
                                        <View>
                                            <Text>{el.date ? moment(el.date).format('DD MMM YY hh:mm a') : 'NA'}</Text>
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
    activityList: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 15,
        // borderColor:'red',
        // borderWidth:1
    },
    activityProfileList: {
        width: 30, height: 30, borderRadius: 50, backgroundColor: "#3d3d3d"
    },
    activityText: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 5
    },
    activityListTexts: {
        flexDirection: 'column',
        gap: 10
    }
})