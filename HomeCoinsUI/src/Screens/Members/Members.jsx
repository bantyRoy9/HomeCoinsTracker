import { ScrollView,  StyleSheet, Text, View, Image, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAxiosHeader } from '../../Utils/CommonAuthFunction';
import axios from 'axios';
import { defaultStyle } from '../../Utils/defaultStyle';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { colors as color } from 'react-native-elements';
import { getMemberList } from '../../Redux/Action/memberAction';

const Members = () => {
  const disptch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { colors, dark } = useTheme();
  const { isLoading,member} = useSelector(state=>state.member);
  useEffect(()=>{
    member && !member.length && disptch(getMemberList(user.groupId));
  },[])
  
  return (
    <>
      {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> :
        <ScrollView showsHorizontalScrollIndicator={false} style={defaultStyle.screenContainer}>
          {member && member.length > 0 ? <>
            {member.map((el, idx) => (
              <View style={{marginVertical:2}} key={idx}>
                <Pressable style={{ flexDirection: 'row',paddingVertical:13,gap:15, alignItems: 'center',borderBottomColor:colors.border,borderBottomWidth:member.length -1 >idx?1:0 }}>
                  <View>
                    <Image source={require(`../../../Assets/profiles/default.png`)} style={{ width: 35, height: 35, borderRadius: 8 }} />
                  </View>
                  <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                      <Text style={{color:colors.text,fontSize:16,fontWeight:"bold"}}>{el?.name.charAt(0).toUpperCase() + el.name.slice(1)}</Text>
                      <Text style={{color:colors.text}}>{el.email}</Text>
                    </View>
                    {el.role==="admin" && <View>
                      <Text style={{color:color.success,fontSize:16,fontWeight:"bold"}}>{el?.role.charAt(0).toUpperCase() + el.role.slice(1)}</Text>
                    </View>}
                  </View>
                </Pressable>
              </View>
            ))}
          </> : <></>
          }
        </ScrollView>}
        <View>
      </View>
    </>
  )
}

export default Members

const styles = StyleSheet.create({})