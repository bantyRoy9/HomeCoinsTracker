import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FeatherIcons, FontAwesome, defaultStyle, homeNavList } from '../../Utils'
import { Chart, DataTable } from '../../Components'
import { Card, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { getEarnExpendData } from '../../Redux/Action/accountAction'
const Daily = ({dateRange}) => {
    const dispatch = useDispatch();
    const { colors, dark } = useTheme();
    const backgroundStyle = {
      backgroundColor: colors.background,
      color: colors.text
    };
    const { isLoading, account } = useSelector(state => state.account);
    let { isAuthenticated, user } = useSelector(state => state.user);
  
    useEffect(() => {
      const fetchEarnExpendData = async () => {
        const dateRange = homeNavList.filter(el => el.active == true);
        console.log(dateRange);
        if(user && Object.keys(user).length === 0){
            user = JSON.parse(await AsyncStorage.getItem('user'));
            dispatch({type:USER_SUCCCESS,payload:user});
        };
            dispatch(getEarnExpendData(dateRange, user?.groupId ?? ""));
      };
      fetchEarnExpendData();
      
      console.log(dateRange);
    }, [dateRange]);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          <View style={{paddingHorizontal:10,paddingVertical:10,backgroundColor:colors.headerBg,marginTop:10,borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',gap:8}}>
              <View style={{padding:8}}><FontAwesome name='chevron-left' color={colors.text} size={15}/></View>
                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                  <View style={{padding:8,borderWidth:1,borderColor:colors.text,borderRadius:5}}><Text style={{color:colors.text,fontWeight:600}}>14</Text></View>
                  <View>
                    <Text style={{color:colors.text}}>January 2024</Text>
                    <Text style={{color:colors.text}}>Sunday</Text>
                  </View>
                </View>
              </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <View>
                <Text style={{color:colors.text,textAlign:'right'}}>Blance</Text>
                <Text style={{color:colors.text,fontSize:16}}>₹12000</Text>
              </View>
              <View style={{padding:8}}><FontAwesome name='chevron-right' color={colors.text} size={15}/></View>
            </View>
          </View>
          {/* <View style={styles.navigationContainer}>
            {homeNavList.map((ele, idx) => (
              <Pressable key={`${ele.label}_${idx}`} onPress={() => navPressHandle(ele)}>
                <Text key={idx} style={ele.active ? { ...styles.activeNavText, backgroundColor: colors.notification, color: colors.primary } : { ...styles.navText, color: colors.text }}>{ele.label}</Text>
              </Pressable>
            ))}
          </View> */}
          {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> : <>
            <View style={defaultStyle.viewSection}>
              <Card containerStyle={{ ...styles.cardContainer, backgroundColor: colors.card }}>
                <View style={styles.cardTitle}>
                  <View>
                    <Text style={{ ...styles.cardLeftTitle, color: colors.text }}>Analytics</Text>
                  </View>
                  <View style={styles.cardRightTitle}>
                    <View>
                      <Text style={{ ...styles.cardRightText, color: colors.text }}>{dateRange?.label}</Text>
                    </View>
                    <View style={{ ...styles.cardRightIconCont, borderColor: colors.text }}>
                      <FeatherIcons name='filter' color={colors.text} size={15} />
                    </View>
                  </View>
                </View>
                <View>
                  {!isLoading && account && account?.analyticsDetail && <>
                    {Object.keys(account?.analyticsDetail).map((el, idx) => (
                      <View key={idx + homeNavList.length} style={styles.analyticsDetails}>
                        <View><Text style={{ ...styles.analyticsText, color: colors.text }}>{el}</Text></View>
                        <View><Text style={{ ...styles.analyticsText, color: colors.text }}>{account.analyticsDetail[el] ? `₹ ${account.analyticsDetail[el]}` : '- - -'}</Text></View>
                      </View>
                    ))}
                  </>}
                </View>
              </Card>
              {!isLoading && account?.graphData && account?.graphData.labels && account?.graphData.labels.length > 0 && <>
                <View style={defaultStyle.viewSection}>
                  <Chart graphData={account?.graphData} />
                </View>
                <View>
                  <DataTable tableData={account.graphData} />
                </View></>}
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