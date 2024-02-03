import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyle } from '../../Utils'
import { Card } from 'react-native-elements';
import { useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
const Daily = ({dateRange}) => {
    const { colors, dark } = useTheme();
    const backgroundStyle = {backgroundColor: colors.background,color: colors.text};
    const { isLoading, account } = useSelector(state => state.account);
    
    return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> : <>
            <View style={defaultStyle.viewSection}>
               <View style={{marginBottom:10}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:10,paddingHorizontal:12,backgroundColor:colors.HeaderBg,}}>
                  <Text style={{fontSize:15,color:colors.text}}>Total Income</Text>
                  <Text style={{fontSize:17,color:colors.text}}>₹{(account && account.earnList && account.earnList.length>0) ? account.earnList.reduce((total,list)=>list.amount+total,0) : "0.00"}</Text>
                </View>
                <View>
                  {(account && account.earnList && account.earnList.length>0) ? account.earnList.map((el,idx)=>(<Pressable key={idx+'earn'}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                      <Text style={{color:colors.text}}>{moment(el.date).format("DD-MM-YYYY")}</Text>
                      <Text style={{color:colors.text}}>₹{el?.amount??"--"}</Text>
                    </View>
                  </Pressable>)) : <View style={{flexDirection:'row',justifyContent:'center',padding:10}}><Text style={{color:colors.error}}>Income Not Found</Text></View>}
                </View>
               </View>
               <View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:10,paddingHorizontal:12,backgroundColor:colors.HeaderBg,}}>
                  <Text style={{fontSize:15,color:colors.text}}>Total Expend</Text>
                  <Text style={{fontSize:17,color:colors.text}}>₹{(account && account.expendList && account.expendList.length>0) ? account.expendList.reduce((total,list)=>list.amount+total,0):"0.00"}</Text>
                </View>
                <View>
                  {(account && account.expendList && account.expendList.length>0) ? account.expendList.map((el,idx)=>(<Pressable key={idx+'expend'}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                      <Text style={{color:colors.text}}>{moment(el.date).format("DD-MM-YYYY")}</Text>
                      <Text style={{color:colors.text}}>₹{el?.amount??"--"}</Text>
                    </View>
                  </Pressable>)) : <View style={{flexDirection:'row',justifyContent:'center',padding:10}}><Text style={{color:colors.error}}>Expend Not Found</Text></View>}
                </View>
               </View>
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