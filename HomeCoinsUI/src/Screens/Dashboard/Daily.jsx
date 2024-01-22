import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyle } from '../../Utils'
import { Card } from 'react-native-elements';
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
const Daily = ({dateRange}) => {
    const { colors, dark } = useTheme();
    const backgroundStyle = {backgroundColor: colors.background,color: colors.text};
    const { isLoading, account } = useSelector(state => state.account);
    return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> : <>
            <View style={defaultStyle.viewSection}>
              
            </View></>}
        </View>
      </ScrollView>
  )
}

export default Daily


const styles = StyleSheet.create({
    toHeaderContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 20,
      paddingBottom: 10,
    },
    navigationContainer: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
      // marginTop: 15
    },
    navText: {
      fontSize: 14,
    },
    activeNavText: {
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 7
    },
    activeNavText1: {
      borderBottomColor:'red',
      borderBottomWidth:5,
      paddingVertical:15
    },
    cardContainer: {
      padding: 15,
      margin: 0,
      borderRadius: 10,
      borderWidth: 0
    },
    cardTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
      alignItems: 'center'
    },
    cardLeftTitle: {
      fontSize: 18,
      fontSize: 20
    },
    cardRightTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardRightText: {
      marginRight: 8,
    },
    cardRightIconCont: {
      borderWidth: 1.5,
      borderRadius: 5,
      padding: 4
    },
    analyticsDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    analyticsText: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 30
    },
    expensEarnBtn: {
      width: '100%',
      height: '90%',
      position: 'absolute'
    },
    earnExpensBtn: {
      // flexDirection:'row',
      // alignItems:'center',
      padding: 15,
      // borderRadius:20
    },
    earnExpensBtnText: {
      fontSize: 16,
      fontWeight: '600'
    },
    earnBtn: {
      backgroundColor: 'green'
    },
    expensBtn: {
      backgroundColor: 'red',
    }
  })