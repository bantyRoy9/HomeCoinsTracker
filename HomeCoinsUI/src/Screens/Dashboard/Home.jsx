import { SafeAreaView, StyleSheet, Pressable, Text, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEarnExpendData } from '../../Redux/Action/accountAction';
import { FloatingActionBtn, Header } from '../../Components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome,topHomeNavList } from '../../Utils';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_SUCCCESS } from '../../Redux/constants';
import Daily from './Daily';
import Monthly from './Monthly';
import moment from 'moment';
const Home = () => {
  const [dateRange, setDateRange] = useState(topHomeNavList.filter(el => el.active == true)[0]);
  const [datePickerVisible, setDatePickerVisible] = useState(false), dispatch = useDispatch(), { colors, dark } = useTheme(),backgroundStyle = {backgroundColor: colors.background,color: colors.text};
  let { user } = useSelector(state => state.user);
  const { account } = useSelector(state=> state.account);
  useEffect(() => {
    const fetchEarnExpendData = async () => {
      if(user && Object.keys(user).length === 0){
        user = JSON.parse(await AsyncStorage.getItem('user'));
        dispatch({type:USER_SUCCCESS,payload:user});
      };
      dispatch(getEarnExpendData(dateRange.dateRange, user?.groupId ?? "",dateRange.label !== "Daily" ? true : false));
    };
    fetchEarnExpendData();
  }, [dateRange]);

  const navPressHandle = (navPress) => {
    topHomeNavList.map(el => el.label === navPress.label ? el.active = true : el.active = false);
    setDateRange(navPress);
  };

  const handleDateRange = (action)=>{
    setDateRange(prevDate=>{
      let date = prevDate.dateRange.split("_"),dateType="days",value="1";
      if(prevDate.label === "Monthly"){dateType="month"}else if(prevDate.label === "Yearly"){dateType="year"};
      if(action === "prev"){value = "-1"};
      return {...prevDate,['dateRange']:`${moment(new Date(date[0])).add(value,dateType).startOf(dateType).format("YYYY-MM-DD")}_${moment(new Date(date[1])).add(value,dateType).endOf(dateType).format("YYYY-MM-DD")}`}
    });
  };
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    const dateFormat = moment(new Date(date)).format("YYYY-MM-DD");
    setDatePickerVisible(false);
    setDateRange(prev => { return {...prev,['dateRange']:`${dateFormat}_${dateFormat}`}});
  };
  let date = dateRange.dateRange.split("_")[0],dateFormat={date:moment(new Date(date)).format("DD"),day:moment(new Date(date)).format("dddd"),month:moment(new Date(date)).format("MMMM"),year:moment(new Date(date)).format("YYYY")},isDaily=dateRange.label === "Daily"?true:false;
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
          <View style={{paddingHorizontal:10,marginHorizontal:18,marginVertical:1,paddingVertical:10,backgroundColor:colors.headerBg,marginTop:10,borderWidth:.4,borderColor:colors.text,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',gap:8}}>
              <Pressable style={{padding:8}} onPress={()=>handleDateRange("prev")}><FontAwesome name='chevron-left' color={colors.text} size={15}/></Pressable>
                <Pressable onPress={showDatePicker} style={{flexDirection:'row',position:'relative',alignItems:'center',justifyContent:`${!isDaily && 'center'}`,flex:1,gap:10}}>
                    {isDaily && <View style={{padding:8,borderWidth:.4,borderColor:colors.text,borderRadius:5}}><Text style={{color:colors.text,fontWeight:600}}>{dateFormat.date}</Text></View>}
                    <View>
                      <Text style={{color:colors.text}}>{dateFormat.month} {dateFormat.year}</Text>
                      {isDaily &&<Text style={{color:colors.text}}>{dateFormat.day}</Text>}
                    </View>
                    <DateTimePickerModal date={new Date(date)} isVisible={datePickerVisible} mode={'date'} onConfirm={handleConfirm} onCancel={hideDatePicker} maximumDate={new Date()} />
                </Pressable>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
            {isDaily && <View>
                <Text style={{color:colors.text,textAlign:'right'}}>Blance</Text>
                <Text style={{color:colors.text,fontSize:16}}>{account && ((account?.earnList.reduce((total,list)=>list.amount+total,0)??0) - (account?.expendList.reduce((total,list)=>list.amount+total,0)??0)).toFixed(2)}</Text>
              </View>}
              <Pressable style={{padding:8}} onPress={()=>handleDateRange("next")}><FontAwesome name='chevron-right' color={colors.text} size={15}/></Pressable>
            </View>
          </View>
          {dateRange.label === "Daily"? <Daily dateRange={dateRange}/> : <Monthly dateRange={dateRange}/>}</View>
        <View style={styles.expensEarnBtn}><FloatingActionBtn /></View>
        <View><Header title="Home"/></View>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({
  navigationContainer: {justifyContent: 'space-around',flexDirection: 'row',alignItems: 'center'},
  navText: {fontSize: 14},
  expensEarnBtn: {width: '100%',height: '90%',position: 'absolute'}
});