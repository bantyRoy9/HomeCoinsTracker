import { StatusBar, StyleSheet, Text, View, Pressable,useColorScheme, SafeAreaView, ScrollView } from 'react-native'
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
    console.log(isLoading,activity);
    return (
        <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
            {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={isDarkMode ? darkColorProps.loaderColor : lightColorProps.loaderColor} /></View> :
                <ScrollView  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                    <View style={defaultStyle.screenContainer}>
                        {activity && activity.data && activity?.data.map(el=>(
                            <>
                            <Pressable key={el._id} style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                <View style={{width:30,height:30,borderRadius:50,backgroundColor:"#3d3d3d"}}>

                                </View>
                                <View>
                                    <Text>{`${el.user.name.toUpperCase()} ${el.methodType === 'POST'?'Add':'Type - NA'} ${el.addExpend && el.addExpend.amount ? el.addExpend.amount+' ₹ Expend':''} ${el.addEarn && el.addEarn.amount ? el.addEarn.amount+' ₹ Earn':''}`}</Text>
                                    <Text>{el.date?moment(el.date).format('DD MMM HH:MM'):'NA'}</Text>
                                </View>
                            </Pressable>
                            <Divider/>
                            </>
                        ))}
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Activity

const styles = StyleSheet.create({})