import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAxiosHeader } from '../../Utils/CommonAuthFunction';
import axios from 'axios';
import { groupControllerURL, userControllerURL } from '../../Utils/URLProperties';
import { defaultStyle } from '../../Utils/defaultCss';
import { useTheme, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { colors as color } from 'react-native-elements';
import { Header } from '../../Components';

const Members = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector(state => state.user);
  const { colors, dark } = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  useEffect(() => {
    const getUsersList = async () => {
      try {
        const { data } = await axios.get(`${groupControllerURL}/groupMembers/${user?.groupId}`, await getAxiosHeader());
        setUserList(data.data);
        setIsLoading(false);
      } catch (err) { }
    };
    getUsersList();
  }, []);
  console.log(isLoading);
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> :
        <ScrollView style={defaultStyle.screenContainer}>
          {userList && userList.length > 0 ? <>
            {userList.map((el, idx) => (
              <View style={{marginVertical:2}} key={idx}>
                <Pressable style={{ flexDirection: 'row',paddingVertical:13,gap:15, alignItems: 'center',borderBottomColor:colors.border,borderBottomWidth:userList.length -1 >idx?1:0 }}>
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
        <Header title="Member"/>
      </View>
    </SafeAreaView>
  )
}

export default Members

const styles = StyleSheet.create({})