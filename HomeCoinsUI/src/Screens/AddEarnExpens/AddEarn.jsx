import { StyleSheet, SafeAreaView, Text, View, StatusBar, Pressable } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import {Input, DatePicker} from '../../Components';
import { updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { defaultStyle } from '../../Utils';
import { ActivityIndicator, useTheme } from 'react-native-paper';
const initalState = {amount:'',source:'',description:'',date:moment(new Date()).format('YYYY-MM-DD')}
const AddEarn = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [details, setDetails] = useState(initalState);
  const [errors,setErrors] = useState({});
  const { isLoading } = useSelector(state=> state.account);
  const { colors,dark} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color: colors.text
  }

  const changeHandler = (key, value) => {
    setErrors(updateErrors(errors,key));
    setDetails({ ...details, [key]: value });
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    let validation = validateForm(details);
    setErrors(validation.error);
    try {
      if(validation.valid){
        dispatch(addEarnExpend(details,'earn'));
        setDetails(initalState);
        navigation.navigate('Home');
      }
    } catch (err) {}
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    setDetails({ ...details, ["date"]: moment(new Date(date)).format('YYYY-MM-DD')});
  };
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={colors.background}></StatusBar>
      <View style={defaultStyle.screenContainer}>
        <View>
          <Input
            key={"Amount"}
            placeholder={"Amount"}
            label={"Enter Amount"}
            isLabel={false}
            name={'amount'}
            icons={'money'}
            value={details?.amount}
            secureTextEntry={false}
            autoFocus={false}
            keyboardType={'numeric'}
            pointerEvents={isLoading ? "none" : "auto"}
            onChangeText={(text) => changeHandler("amount", text)}
            isHelper={errors.amount ? true : false}
            errorMsg={errors?.amount}
            helperType={'error'}
          />
        </View>
        <View>
          <Input
            key={"source"}
            placeholder={"Source"}
            label={"Source"}
            isLabel={false}
            name={'source'}
            icons={'soundcloud'}
            value={details?.source}
            secureTextEntry={false}
            autoFocus={false}
            pointerEvents={isLoading ? "none" : "auto"}
            onChangeText={(text) => changeHandler("source", text)}
            isHelper={errors.source ? true : false}
            errorMsg={errors?.source}
            helperType={'error'}
          />
        </View>
        <View>
          <Input
            key={"description"}
            placeholder={"Description"}
            label={"Enter Description"}
            isLabel={false}
            name={'description'}
            icons={'barcode'}
            value={details?.description}
            secureTextEntry={false}
            autoFocus={false}
            pointerEvents={isLoading ? "none" : "auto"}
            onChangeText={(text) => changeHandler("description", text)}
            isHelper={errors.description ? true : false}
            errorMsg={errors?.description}
            helperType={'error'}
          />
        </View>
        <View>
          <DatePicker 
            key={"date"}
            value ={selectedDate}
            onPress={showDatePicker}
            date={selectedDate}
            isVisible={datePickerVisible}
            pointerEvents={isLoading ? "none" : "auto"}
            mode={'date'}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            onChangeText={(text)=>changeHandler("date", text)}
          />
        </View>
        
        <View style={{ width: "auto", alignItems: 'center' }}>
          <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler} pointerEvents={isLoading?"none":"auto"}>
            <Text style={{ ...styles.text, ...btnStyle.color }}>{ isLoading ? <ActivityIndicator size={'small'} color={colors.loaderColor}/> : "ADD EARN"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddEarn

const styles = StyleSheet.create({

  earnBtn: {
    backgroundColor: 'green'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50,
    elevation: 3,
    width: "70%",
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
})