import { StyleSheet, Text, View,Pressable } from 'react-native'
import React,{ useState,useEffect } from 'react'
import { Input } from '../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { showAlert, updateErrors, validateForm } from '../../Utils/CommonAuthFunction';
import { createGroupAndRequest } from '../../Redux/Action/groupAction';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Group = ({navigation,pageName,colors }) => {
    let fields = pageName == "CreateNewGroup" ? "name" : "email";
    const [detail,setDetail]=useState({[fields]:""});
    const [errors,setErrors]=useState({});
    const dispatch = useDispatch();
    const { user } = useSelector(state=>state.user);
    const { isLoading } = useSelector(state=>state.group);

    useEffect(()=>{
      const fetchUser = async()=>{
        let userDetail = await AsyncStorage.multiGet(["userEmail","isActive"]);
        if(userDetail[1][1]?.toLowerCase?.() === 'false'){ 
          navigation.navigate('OtpVerification',{email:userDetail[0][1]});
        }else{
          navigation.navigate(pageName);
        }
      };
      fetchUser()
    },[]);
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
                navigation.navigate('CreateGroup');   
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
              placeholder={"Group Name"}
              label={pageName == "CreateNewGroup" ? "Group Name" : "Group Admin Email"}
              isLabel={false}
              name={fields}
              icons={pageName == "CreateNewGroup"?'users':"envelope"}
              value={detail.name}
              secureTextEntry={false}
              autoFocus={false}
              onChangeText={(text) => changeHandler(fields, text)}
              isHelper={errors[fields] ? true : false}
              errorMsg={errors[fields]}
              helperType={'error'}
            />
            <Pressable style={{ ...styles.button, ...btnStyle }} onPress={submitHandler} >
                <Text style={{ ...styles.text, ...btnStyle.color }}>{isLoading ? <ActivityIndicator size={'small'} color={colors.text}/> : pageName == "CreateNewGroup" ? "DONE" : "SEND REQUEST"}</Text>
              </Pressable>
          </View>
  )
}

export default Group

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