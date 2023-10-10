import { StyleSheet, SafeAreaView, Text, View, useColorScheme, StatusBar, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import { defaultStyle } from '../../Utils/defaultCss';
import Input from '../../Components/Input';
import moment from 'moment';
import { updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import DatePicker from '../../Components/DatePicker';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const initialState = {amount:"",description:"",date:moment().format('YYYY-MM-DD')}
const AddEarnExpens = () => {
  const isDarkMode = useColorScheme() == 'dark';
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [details, setDetails] = useState(initialState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [errors,setErrors] = useState({});
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };
  const btnStyle = {
    backgroundColor: isDarkMode ? darkColorProps.btnBackground : lightColorProps.btnBackground,
    color: isDarkMode ? darkColorProps.btnBackground : "#FFF"
  }

  const changeHandler = (name, value) => {
    setErrors(updateErrors(name));
    setDetails({ ...details, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let validation = validateForm(details);
    setErrors(validation.error);
    try {
      if(validation.valid){
        dispatch(addEarnExpend(details,'expend'));
        setDetails(initialState);
        //navigation.navigate('Home');
      }
    } catch (err) {
      console.warn(err)
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
            onChangeText={(text) => changeHandler("amount", text)}
            isHelper={errors.amount ? true : false}
            errorMsg={errors?.amount}
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
          mode={'date'}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onChangeText={(text)=>changeHandler("date", text)}
          isHelper={errors.date ? true : false}
          errorMsg={errors?.date}
          helperType={'error'}
          />
          
        </View>
        <View style={{ width: "auto", alignItems: 'center' }}>
          <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler}>
            <Text style={{ ...styles.text, ...btnStyle.color }}>{"ADD EXPEND"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddEarnExpens

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