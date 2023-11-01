import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAxiosHeaderWithoutCookie } from '../../Utils/CommonAuthFunction';
import axios from 'axios';
import { groupControllerURL, userControllerURL } from '../../Utils/URLProperties';
import { defaultStyle } from '../../Utils/defaultCss';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

const Members = ({ navigate }) => {
  const [userList, setUserList] = useState([]);
  const { user } = useSelector(state=>state.user);
  const { colors,dark} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  useEffect(() => {
    const getUsersList = async () => {
      try {
        const { data } = await axios.get(`${groupControllerURL}/groupMembers/${user?.groupId}`, getAxiosHeaderWithoutCookie());
        setUserList(data.data);
      } catch (err) { }
    };
    getUsersList();
  }, []);
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <ScrollView style={defaultStyle.screenContainer}>
        {userList && userList.length > 0 && <>
          {userList.map(el => (
            <View style={{flexDirection:'row',gap:20}}>
              <View>
                <Image source={require(`../../../Assets/profiles/default.png`)}
                  style={{ width: 35, height: 35, borderRadius: 50 }}
                />
              </View>
              <View>
              <Text>{el?.name.charAt(0).toUpperCase() + el.name.slice(1)}</Text>
              {/* <Text>{el.}</Text> */}
              <Text>{el.userId}</Text>
              <Text>{el.email}</Text>
              <Text>{el.role}</Text>
              </View>
            </View>
          ))}
        </>}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Members

const styles = StyleSheet.create({})