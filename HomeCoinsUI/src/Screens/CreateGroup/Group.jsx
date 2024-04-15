import { StyleSheet, View } from 'react-native'
import React,{ useState } from 'react'
import { Input,Button } from '../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, updateErrors, validateForm } from '../../Utils';
import { createGroupAndRequest } from '../../Redux/Action/groupAction';


const Group = ({navigation,pageName }) => {
  let fields = pageName == "CreateNewGroup" ? "name" : "email";
  const [detail,setDetail]=useState({[fields]:""});
  const [errors,setErrors]=useState({});
  const dispatch = useDispatch();
  const { user } = useSelector(state=>state.user);
  const { isLoading } = useSelector(state=>state.group);
  const changeHandler=(key,value)=>{
      updateErrors(errors,key);
      setDetail({...detail,[key]: value});
  };
    
  const submitHandler = () =>{
    try{
      const validation = validateForm(detail);
      setErrors(validation.error);
      if(validation.valid){
          dispatch(createGroupAndRequest(detail,fields=="email"?user.id:"",navigation));
        }
      }catch(err){
        showAlert(err);
      }
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
            <Button onPress={submitHandler} isLoading={isLoading} title={pageName == "CreateNewGroup" ? "Continue" : "Send Request"} />
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