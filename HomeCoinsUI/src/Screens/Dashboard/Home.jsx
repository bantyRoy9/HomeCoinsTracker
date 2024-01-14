import { ScrollView, ActivityIndicator, SafeAreaView, StyleSheet, Pressable, Text, View, useColorScheme, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getEarnExpendData } from '../../Redux/Action/accountAction';
import { Chart, DataTable, DatePicker, FloatingActionBtn, Header } from '../../Components';
import { homeNavList, defaultStyle, FeatherIcons, FontAwesome } from '../../Utils';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_SUCCCESS } from '../../Redux/constants';
import { topHomeNavList } from '../../Utils/homeNavList';
import Daily from './Daily';
import Monthly from './Monthly';
const Home = () => {
  const [dateRange, setDateRange] = useState({ label: 'Daily' });
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
      if(user && Object.keys(user).length === 0){
        user = JSON.parse(await AsyncStorage.getItem('user'));
        dispatch({type:USER_SUCCCESS,payload:user});
      };
      dispatch(getEarnExpendData(dateRange, user?.groupId ?? ""));
    };
    fetchEarnExpendData();
  }, [dateRange]);

  const navPressHandle = (navPress) => {
    topHomeNavList.map(el => el.label == navPress.label ? el.active = true : el.active = false);
    setDateRange(navPress);
  };

  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
        <View style={{...styles.navigationContainer,backgroundColor:colors.HeaderBg,paddingHorizontal:10}}>
            {topHomeNavList.map((ele,idx)=>(
              <Pressable onPress={()=>navPressHandle(ele)} key={`${ele.label}_${idx}`} style={{flex:1}}>
                <Text style={ele.active ? {textAlign:'center',fontSize: 14, color:colors.text,paddingVertical:12,borderBottomColor:colors.notification,borderBottomWidth:3} : { ...styles.navText,textAlign:'center',fontSize:16,paddingVertical:12, color: colors.text }}>{ele.label}</Text>
              </Pressable>
            ))}
        </View>
        {dateRange.label === "Daily"? <Daily dateRange={dateRange}/> : <Monthly/>}             
      <View style={styles.expensEarnBtn}>
        <FloatingActionBtn />
      </View>
      <View>
        <Header title="Home"/>
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