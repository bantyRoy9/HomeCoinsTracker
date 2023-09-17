import { ScrollView, SafeAreaView, StyleSheet, Pressable, Text, View, useColorScheme, StatusBar } from 'react-native'
import { darkColorProps, lightColorProps } from '../../src/Utils/colorProp';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icons6 from 'react-native-vector-icons/FontAwesome6';
import { homeNavList } from '../../src/Utils/homeNavList';
import Chart from '../../src/Components/Chart/Chart';
import React, { useState, useEffect } from 'react'
import Header from '../../src/Components/Header';
import { Card } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import { defaultStyle } from '../../src/Utils/defaultCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { URL } from 'react-native-dotenv'
const analyticsJson = {}
const Home = () => {
  const navigation = useNavigation();
  const [graphData, setGraphData] = useState(null);
  const [dateRange, setDateRange] = useState({})
  const isDarkMode = useColorScheme() == "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };

  useEffect(() => {
    
    const fetchDate = async () => {
      try {
        const dateRange = homeNavList.filter(el => el.active == true);
        console.log(`http://192.168.1.73:8000/api/v1/accountController/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`);
        const { data } = await axios.get(`http://192.168.1.73:8000/api/v1/accountController/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`);
          console.log(data);
        if (data.status && data.data && data.graphData) {
          getAnalyticsDetails(data.graphData)
          data.graphData.datasets.map((el, id) => el['color'] = function () { return data.graphData.datasets[id].colorCode })
          data.graphData.labels = data.graphData.labels.map(el => moment(el, 'DD-MM-YYYY').format('DD MMM'));
          setGraphData(data.graphData);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchDate();
  }, [dateRange]);
  const getAnalyticsDetails = (resData) => {
    analyticsJson.Earn = resData.datasets[0].data.reduce((a, b) => a + b, 0);
    analyticsJson.Expend = resData.datasets[1].data.reduce((a, b) => a + b, 0);
    analyticsJson.Saving = analyticsJson.Earn - analyticsJson.Expend;
  }
  
  const navPressHandle = (navPress) =>{
    homeNavList.map(el=>{
      if(el.label == navPress.label){
        el.active = true
      }else{
        el.active = false
      }
    });
    setDateRange(navPress);
  }
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          <View style={styles.toHeaderContainer}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '600', color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }}>Dashbord</Text>
            </View>
            <View style={{ position: 'relative' }}>
              <Icons name='bell' color={backgroundStyle.color} size={20} />
              <View style={{ position: 'absolute', width: 10, height: 10, borderRadius: 50, backgroundColor: 'red', right: 0 }}></View>
            </View>
          </View>
          <View style={styles.navigationContainer}>
            {homeNavList.map((ele, idx) => (
              <Pressable key={`${idx}`} onPress={()=>navPressHandle(ele)}>
                <Text style={ele.active ? styles.activeNavText : styles.navText}>{ele.label}</Text>
              </Pressable>
            ))}
          </View>
          <View style={defaultStyle.viewSection}>
            <Card containerStyle={{ ...styles.cardContainer, backgroundColor: isDarkMode ? darkColorProps.cardBackground : lightColorProps.cardBackground }}>
              <View style={styles.cardTitle}>
                <View>
                  <Text style={styles.cardLeftTitle}>Analytics</Text>
                </View>
                <View style={styles.cardRightTitle}>
                  <View>
                    <Text style={styles.cardRightText}>Last 7 days</Text>
                  </View>
                  <View style={{ ...styles.cardRightIconCont, borderColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }}>
                    <FeatherIcons name='filter' style={{ ...styles.cardRightIcon, borderColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }} color={isDarkMode ? darkColorProps.textColor : lightColorProps.textColor} />
                  </View>
                </View>
              </View>
              <View>
                {analyticsJson && <>
                  {Object.keys(analyticsJson).map((el, idx) => (
                    <View key={`${idx}`} style={styles.analyticsDetails}>
                      <View><Text style={styles.analyticsText}>{el}</Text></View>
                      <View><Text style={styles.analyticsText}>₹{analyticsJson[el].toFixed(2)}</Text></View>
                    </View>
                  ))}
                </>}
              </View>
            </Card>
            <View style={defaultStyle.viewSection}>
              {graphData && graphData.labels && graphData.labels.length>0 && <Chart graphData={graphData} />}
            </View>
            
            <View style={defaultStyle.viewSection}>
              {graphData && graphData.labels && graphData.labels.length>0 && <Chart graphData={graphData} />}
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <View style={{...defaultStyle.viewSection}}>
          <View style={{...styles.expensEarnBtn,...defaultStyle.screenWidth}}>
            <Pressable style={{...defaultStyle.earnExpensBtn,...styles.earnBtn}} onPress={()=>navigation.navigate('EarnExpens')}>
              <Text style={defaultStyle.earnExpensBtnText}><Icons6 name='hand-holding-dollar' size={16}/> Add Earn</Text>
            </Pressable>
            <Pressable style={{...defaultStyle.earnExpensBtn,...styles.expensBtn}} onPress={()=>navigation.navigate('EarnExpens')}>
              <Text style={defaultStyle.earnExpensBtnText}><Icons6 name='money-check-dollar' size={16}/> Add Expens</Text>
            </Pressable>
          </View>
        </View>
        <Header />
      </View>
    </SafeAreaView>
  )
}

export default Home

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
    marginVertical: 6
  },
  navText: {
    fontSize: 14,
  },
  activeNavText: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 7,
    fontWeight: '600'
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
    fontWeight: '500',
    fontSize: 20
  },
  cardRightTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRightText: {
    marginRight: 8,
    fontWeight: '500'
  },
  cardRightIconCont: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 2
  },
  cardRightIcon: {
    fontSize: 15,
    fontWeight: '800',
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
    zIndex:1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent:'space-between',
    bottom: 0,
    marginHorizontal:22
  },
  
  earnBtn:{
    backgroundColor:'green'
  },
  expensBtn:{
    backgroundColor:'red',
  }
})