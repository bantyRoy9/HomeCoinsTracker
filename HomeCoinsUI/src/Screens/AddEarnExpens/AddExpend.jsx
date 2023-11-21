import { StyleSheet, SafeAreaView, Text, View, useColorScheme, StatusBar, Pressable } from 'react-native'
import { updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { darkColorProps, lightColorProps,defaultStyle } from '../../Utils';
import { addEarnExpend } from '../../Redux/Action/accountAction';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import {Input,DatePicker} from '../../Components';
import { useDispatch,useSelector } from 'react-redux';
import React, { useState } from 'react'
import moment from 'moment';

const initialState = {amount:"",description:"",date:moment().format('YYYY-MM-DD')}
const AddExpend = ({navigation}) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState(initialState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [errors,setErrors] = useState({});
  const { isLoading } = useSelector(state=> state.account);
  const { colors,dark} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  const btnStyle = {
    backgroundColor: colors.btnBackground,
    color: colors.btnBackground
  }

  const changeHandler = (name, value) => {
    setErrors(updateErrors(errors,name));
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
      <StatusBar backgroundColor={colors.background}></StatusBar>
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
            key={"Description"}
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
          key="Date"
          value ={selectedDate}
          onPress={showDatePicker}
          date={selectedDate}
          isVisible={datePickerVisible}
          mode={'date'}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          pointerEvents={isLoading ? "none" : "auto"}
          onChangeText={(text)=>changeHandler("date", text)}
          isHelper={errors.date ? true : false}
          errorMsg={errors?.date}
          helperType={'error'}
          />
          
        </View>
        <View style={{ width: "auto", alignItems: 'center' }}>
          <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler} pointerEvents={isLoading?"none":"auto"}>
            <Text style={{ ...styles.text, ...btnStyle.color }}>{isLoading ? <ActivityIndicator size={'small'} color={colors.loaderColor}/> :"ADD EXPEND"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddExpend

const styles = StyleSheet.create({
  button: {
    alignItems:"center",
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 10,
    width:"100%",
    marginVertical: 15
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
})