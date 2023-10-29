import { StyleSheet, Text, View,Pressable } from 'react-native'
import React,{ useState } from 'react'
import { Input } from '../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';

const OtpVerification = ({ navigation }) => {

    const [detail,setDetail]=useState({otp:""});
    const [errors,setErrors]=useState({});
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { isLoading,user,isAuthenticated } = useSelector(state=>state.user);
    const changeHandler=(key,value)=>{
        updateErrors(errors,key);
        setDetail({...detail,[key]: value});
    };
    
    const submitHandler = () =>{
        try{
            const validation = validateForm(detail);
            setErrors(validation.error);
            if(validation.valid){
                dispatch(createGroupAndRequest(detail,fields=="email"?user.id:""));
            }
        }catch(err){
            showAlert(err);
        }
    }
    const btnStyle = {
        backgroundColor: colors.btnBackground,
        color:colors.text
      };
    
  return (
    <View>
            <Input
              placeholder={"Enter Otp"}
              label={'Enter Otp'}
              isLabel={false}
              name={"Otp"}
              icons={"Enter"}
              value={detail.name}
              secureTextEntry={false}
              autoFocus={false}
              onChangeText={(text) => changeHandler('otp', text)}
              isHelper={errors.otp ? true : false}
              errorMsg={errors.otp}
              helperType={'error'}
            />
            <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler} >
                <Text style={{ ...styles.text, ...btnStyle.color }}>{"Verify"}</Text>
              </Pressable>
          </View>
  )
}
export default OtpVerification
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 10,
        width: "100%",
        marginVertical: 15
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
      },
})