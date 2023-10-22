import { StyleSheet, SafeAreaView, Text, View, useColorScheme, StatusBar, Pressable } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import {Input, DatePicker} from '../../Components';
import { updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { darkColorProps, lightColorProps,defaultStyle } from '../../Utils';
import { ActivityIndicator } from 'react-native-paper';
const initalState = {amount:'',source:'',description:'',date:moment(new Date()).format('YYYY-MM-DD')}
const AddEarn = ({navigation}) => {
  const isDarkMode = useColorScheme() == 'dark';
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [details, setDetails] = useState(initalState);
  const [errors,setErrors] = useState({});
  const { isLoading } = useSelector(state=> state.account);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };
  const btnStyle = {
    backgroundColor: isDarkMode ? darkColorProps.btnBackground : lightColorProps.btnBackground,
    color: isDarkMode ? darkColorProps.btnBackground : "#FFF"
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
    } catch (err) {
      console.log(err)
    }
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
      <StatusBar backgroundColor={isDarkMode ? darkColorProps.background : lightColorProps.background}></StatusBar>
      <View style={defaultStyle.screenContainer}>
        <View>
          <Input
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
            <Text style={{ ...styles.text, ...btnStyle.color }}>{ isLoading ? <ActivityIndicator size={'small'} color={isDarkMode?darkColorProps.loaderColor:lightColorProps.loaderColor}/> : "ADD EARN"}</Text>
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