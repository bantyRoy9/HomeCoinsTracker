import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { darkColorProps, lightColorProps } from '../../Utils/colorProp';
import { getAxiosHeaderWithoutCookie } from '../../Utils/CommonAuthFunction';
import axios from 'axios';
import { userControllerURL } from '../../Utils/URLProperties';
import { defaultStyle } from '../../Utils/defaultCss';

const Members = ({ navigate }) => {
  const [userList, setUserList] = useState([]);
  const isDarkMode = useColorScheme() == 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };
  useEffect(() => {
    const getUsersList = async () => {
      try {
        const { data } = await axios.get(`${userControllerURL}/users`, getAxiosHeaderWithoutCookie());
        console.log(data);
        setUserList(data.data);
      } catch (err) { }
    };
    getUsersList();
  }, []);
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
              <Text>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</Text>
              {/* <Text>{el.}</Text> */}
              <Text>{el.name}</Text>
              <Text>{el.name}</Text>

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