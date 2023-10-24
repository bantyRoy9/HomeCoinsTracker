import { StatusBar, StyleSheet, Text, View, Pressable, useColorScheme, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import { useDispatch, useSelector } from 'react-redux';
import { getActivity } from '../../Redux/Action/activityAction';
import { ActivityIndicator, Divider, useTheme } from 'react-native-paper';
import { defaultStyle } from '../../Utils/defaultCss';
import moment from 'moment';
import { stringTransform } from '../../Utils/HomeCommon';
import { colors as color } from 'react-native-elements';
import { showAlert } from '../../Utils/CommonAuthFunction';


const Activity = () => {
    const isDarkMode = useColorScheme() == 'dark';
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const backgroundStyle = {
        backgroundColor: colors.background,
        color: colors.text
    };
    const { isLoading, activity } = useSelector(state => state.activity);
    useEffect(() => {
        try{
            dispatch(getActivity());
        }catch(err){
            showAlert(err);
        }
    }, [dispatch]);
    console.log(isLoading, activity);
    return (
        <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
            {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> :
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
                                                    <View><Text style={{color:colors.text}}>Earn By</Text></View>
                                                    <View><Text style={{color:colors.text}}>{stringTransform(el.addEarn?.source??"NA",'c')}</Text></View>
                                                </>}
                                                {el.Url == "/expend" && <>
                                                    <View><Text style={{color:colors.text}}>Expend to</Text></View>
                                                    <View><Text style={{color:colors.text}}>{el.addExpend?.description ?? 'NA'}</Text></View>
                                                </>}
                                            </View>
                                        </View>
                                        <View style={styles.activityRightSec}>
                                            <Text style={{color: el.Url == "/expend"? color.error: color.success}}>{`${el.Url == "/expend" ? '- ₹' + el.addExpend?.amount ?? "NA" + '' : '+ ₹' + el.addEarn?.amount ?? "NA" + ''} `}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <View>
                                            <Text style={{color:colors.text}}>{el.date ? moment(el.date).format('DD MMM YY hh:mm a') : 'NA'}</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:colors.text}}>{`Add By ${stringTransform(el.user.name, 'C')} `}</Text>
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