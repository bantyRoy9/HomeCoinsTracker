import React, { useState, useEffect } from 'react'
import { StyleSheet, Pressable, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getEarnExpendData } from '../../Redux/Action/accountAction';
import { FontAwesome,defaultStyle,topHomeNavList } from '../../Utils';
import { FloatingActionBtn } from '../../Components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_SUCCCESS } from '../../Redux/constants';
import Daily from './Daily';
import Monthly from './Monthly';
import { getSourceList } from '../../Redux/Action/sourceAction';
import { getMemberList } from '../../Redux/Action/memberAction';

const Home = () => {
  const [dateRange, setDateRange] = useState(topHomeNavList.filter(el => el.active == true)[0]);
  const [datePickerVisible, setDatePickerVisible] = useState(false), dispatch = useDispatch(), { colors, dark } = useTheme();
  let { user } = useSelector(state=>state.user);
  const { account } = useSelector(state=>state.account);
  const { source,expendType } = useSelector(state=>state.source);
  const { member } = useSelector(state=>state.member);

  useEffect(() => {
    const fetchEarnExpendData = async () => {
      if(user && Object.keys(user).length === 0){
        user = JSON.parse(await AsyncStorage.getItem('user'));
        dispatch({type:USER_SUCCCESS,payload:user});
      };
      dispatch(getEarnExpendData(dateRange.dateRange, user?.groupId ?? "",dateRange.label !== "Daily" ? true : false));
      source && !source.length && dispatch(getSourceList('source'));
      member && !member.length && dispatch(getMemberList(user.groupId));
      setTimeout(()=>{
        expendType && !expendType.length && dispatch(getSourceList('expendType'));
      },2000);
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
        <>
        <View style={{...styles.navigationContainer,backgroundColor:colors.HeaderBg}}>
            {topHomeNavList.map((ele,idx)=>(
              <Pressable onPress={()=>navPressHandle(ele)} key={`${ele.label}_${idx}`} style={{flex:1}}>
                <Text style={ele.active ? {...styles.navText,color:colors.HeaderText,borderBottomColor:colors.notification,borderBottomWidth:2} : { ...styles.navText,color: colors.HeaderText }}>{ele.label}</Text>
              </Pressable>
            ))}
        </View>
        <View style={{flex:1,height:'100%'}}>
          <View style={{paddingHorizontal:10,marginHorizontal:10,marginVertical:1,paddingVertical:10,backgroundColor:colors.surfaceVariant,marginTop:10,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',gap:8}}>
              <TouchableOpacity style={{padding:8}} onPress={()=>handleDateRange("prev")}><FontAwesome name='chevron-left' color={colors.text} size={15}/></TouchableOpacity>
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
                <Text style={{color:colors.text,...defaultStyle.text}}>{account && ((account?.earnList?.reduce((total,list)=>parseFloat(list?.amount??0)+total,0)??0) - (account?.expendList?.reduce((total,list)=>parseFloat(list?.amount??0)+total,0)??0)).toFixed(2)}</Text>
              </View>}
              <TouchableOpacity style={{padding:8}} onPress={()=>handleDateRange("next")}><FontAwesome name='chevron-right' color={colors.text} size={15}/></TouchableOpacity>
            </View>
          </View>
          {dateRange.label === "Daily"? <><Daily dateRange={dateRange}/><View style={styles.expensEarnBtn}><FloatingActionBtn dateRange={dateRange.dateRange}/></View></> : <Monthly dateRange={dateRange}/>}</View>
        </>
    
  );
};
export default Home;
const styles = StyleSheet.create({
  navigationContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10
  },
  navText: {
    textAlign:'center',
    ...defaultStyle.text,
    paddingVertical:12
  },
  expensEarnBtn: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top:0
  },

});