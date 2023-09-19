import { StyleSheet, SafeAreaView, Text, View, useColorScheme, StatusBar, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome';
import { darkColorProps, lightColorProps } from '../../src/Utils/colorProp';
import { defaultStyle } from '../../src/Utils/defaultCss';
import Input from '../../src/Components/Input';
import ModalDatePicker from 'react-native-datepicker-modal'
import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAxiosHeader } from '../../src/Utils/CommonAuthFunction';
import DatePicker from '../../src/Components/DatePicker';
const AddEarnExpens = () => {
  const isDarkMode = useColorScheme() == 'dark';
  const [details, setDetails] = useState({date:moment().format('YYYY-MM-DD')})
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };
  const btnStyle = {
    backgroundColor: isDarkMode ? darkColorProps.btnBackground : lightColorProps.btnBackground,
    color: isDarkMode ? darkColorProps.btnBackground : "#FFF"
  }

  const changeHandler = (name, value) => {
    setDetails({ ...details, [name]: value })
  }
  const showAlert = () =>
    Alert.alert(
      'Done',
      `${details?.amount} save successfull.`,
      [
        {
          text: 'OK',
          onPress: () =>{setDetails({})},
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>{},
      },
    );
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://homecoinstracker.onrender.com/api/v1/accountController/earn', details, getAxiosHeader);
      if (res.data.status == 'true') {
        showAlert();
      }
    } catch (err) {
      console.log(err)
    }
  }
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
            onChangeText={(text) => changeHandler("source", text)}
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
          />
        </View>
        <View>
          <DatePicker />
        </View>
        
        <View style={{ width: "auto", alignItems: 'center' }}>
          <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler}>
            <Text style={{ ...styles.text, ...btnStyle.color }}>{"ADD EARN"}</Text>
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