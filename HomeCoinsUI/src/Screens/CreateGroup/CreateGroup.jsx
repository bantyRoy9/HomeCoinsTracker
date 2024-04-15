import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { defaultStyle,MaterialIcon } from '../../Utils';
import Group from './Group';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateGroup = ({ navigation,route }) => {
  const { colors } = useTheme();
  const [userDetails,setUserDetails] = useState({userVerified:false,email:""});
  const navigatePage=(pageName)=>{
    (userDetails.userVerified ==="true" || route?.params?.isActive === "true")? navigation.navigate(pageName) : navigation.navigate('OtpVerification',{email:userDetails.email});
  };

  useEffect(()=>{
    const fetchUser = async()=>{
      let userDetail = await AsyncStorage.multiGet(["userEmail","isActive"]);
      setUserDetails({userVerified:userDetail[1][1],email:userDetail[0][1]})
    };
    fetchUser()
  },[]);
  return (
    <View style={defaultStyle.screenContainer}>
          { route.name == "CreateGroup" && <View style={styles.createGroupSection}>
            <Pressable style={{...styles.sectionCircle,backgroundColor:colors.surfaceVariant,color:colors.text}} onPress={()=>navigatePage('CreateNewGroup')}>
              <View style={styles.sectionText}>
                <MaterialIcon name='add-home' size={45} color={colors.text}/>
                <Text style={{...defaultStyle.textBold,color:colors.text}}>New Home</Text>
              </View>
            </Pressable>
            <View>
              <Text style={{...defaultStyle.textBold,...styles.sectionOr,color:colors.text}}>OR</Text>
            </View>
            <Pressable style={{...styles.sectionCircle,backgroundColor:colors.surfaceVariant}} onPress={()=>navigatePage('ExistingGroup')}>
              <View style={styles.sectionText}>
                <MaterialIcon name='add-home-work' size={45}  color={colors.text}/>
                <Text style={{...defaultStyle.textBold,color:colors.text}}>Existing Home</Text>
              </View>
            </Pressable>
          </View>}
          {(userDetails.userVerified ==="true" || route?.params?.isActive === "true") && (route.name === "CreateNewGroup" || route.name === "ExistingGroup") && <Group pageName={route.name} colors={colors} navigation={navigation}/>}
    </View>
  )
}

export default CreateGroup

const styles = StyleSheet.create({
  createGroupSection: {
    alignItems:'center',
    height:"100%",
    flexDirection:'column',
    justifyContent:'space-evenly'
  },
  sectionCircle: {
    width:200,
    height:200,
    borderRadius:100,
    textAlign:'center',
  },
  sectionText:{
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    fontSize:20,
    gap:5
  },
  sectionOr:{
    paddingVertical:5,
    paddingHorizontal:15,
    fontSize:24
  }
})