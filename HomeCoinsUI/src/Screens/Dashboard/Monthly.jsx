import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,memo } from 'react'
import { FeatherIcons, FontAwesome, defaultStyle, homeNavList } from '../../Utils'
import { Chart, DataTable } from '../../Components'
import { useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
const Monthly = ({dateRange,monthlyHandle}) => {
    const { colors } = useTheme();
    const backgroundStyle = {backgroundColor: colors.background,color: colors.text};
    let { isLoading, account } = useSelector(state => state.account);
    useEffect(()=>{
      if(dateRange.label === "Yearly" && account.graphData && account.graphData.labels && account.graphData.labels.length ){
        let date = account.graphData.labels[0]?.split(" ")[1],label=[date],obj={};
        account.graphData.labels.forEach((el,idx)=>{
          obj[el.split(" ")[1]]=[]
          if(date === el.split(" ")[1]){

          }else{
            date=el.split(" ")[1];
            label.push(date)
          }
        });
      }
    },[account])
    return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> : <>
            <View style={defaultStyle.viewSection}>
              <View style={{ ...styles.cardContainer, backgroundColor: colors.card }}>
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
              </View>
              {!isLoading && account?.graphData && account?.graphData.labels && account?.graphData.labels.length > 0 && <>
                <View style={defaultStyle.viewSection}>
                  <Chart graphData={account?.graphData} />
                </View>
                <View>
                  <DataTable tableData={account.graphData} monthlyHandle={monthlyHandle}/>
                </View></>}
            </View></>}
        </View>
      </ScrollView>
  )
}

export default memo(Monthly)


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