import { SafeAreaView, StyleSheet, Pressable, Text, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEarnExpendData } from '../../Redux/Action/accountAction';
import { FloatingActionBtn, Header } from '../../Components';
import { FontAwesome, homeNavList } from '../../Utils';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_SUCCCESS } from '../../Redux/constants';
import { topHomeNavList } from '../../Utils/homeNavList';
import Daily from './Daily';
import Monthly from './Monthly';
import moment from 'moment';
const Home = () => {
  const [dateRange, setDateRange] = useState({ label: 'Daily' });
  let dateFormatObj={date:moment().format("DD"),day:moment().format("dddd"),month:moment().format("MMMM"),year:moment().format("YYYY")};
  const [ dateFormat, setDateFormat]=useState(dateFormatObj)
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const backgroundStyle = {backgroundColor: colors.background,color: colors.text};
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
    console.log(navPress);
    setDateRange(navPress);
  };

  handleDateRange =(action)=>{
    console.log(action);
  }
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
        <View style={{flex:1}}>
          <View style={{paddingHorizontal:10,marginHorizontal:18,marginVertical:1,paddingVertical:10,backgroundColor:colors.headerBg,marginTop:10,borderWidth:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',gap:8}}>
              <Pressable style={{padding:8}} onPress={()=>handleDateRange("prev")}><FontAwesome name='chevron-left' color={colors.text} size={15}/></Pressable>
                <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                  <View style={{padding:8,borderWidth:1,borderColor:colors.text,borderRadius:5}}><Text style={{color:colors.text,fontWeight:600}}>{dateFormat.date}</Text></View>
                  <View>
                    <Text style={{color:colors.text}}>{dateFormat.month} {dateFormat.year}</Text>
                    <Text style={{color:colors.text}}>{dateFormat.day}</Text>
                  </View>
                </View>
              </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <View>
                <Text style={{color:colors.text,textAlign:'right'}}>Blance</Text>
                <Text style={{color:colors.text,fontSize:16}}>₹12000</Text>
              </View>
              <Pressable style={{padding:8}} onPress={()=>handleDateRange("next")}><FontAwesome name='chevron-right' color={colors.text} size={15}/></Pressable>
            </View>
          </View>
          {dateRange.label === "Daily"? <Daily dateRange={dateRange}/> : <Monthly dateRange={dateRange}/>}</View>
        <View style={styles.expensEarnBtn}><FloatingActionBtn /></View>
        <View><Header title="Home"/></View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  navigationContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 14,
  },
  expensEarnBtn: {
    width: '100%',
    height: '90%',
    position: 'absolute'
  },
  earnBtn: {
    backgroundColor: 'green'
  }
})