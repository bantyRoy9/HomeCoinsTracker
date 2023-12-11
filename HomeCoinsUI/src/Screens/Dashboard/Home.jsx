import { ScrollView, ActivityIndicator, SafeAreaView, StyleSheet, Pressable, Text, View, useColorScheme, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getEarnExpendData } from '../../Redux/Action/accountAction';
import { Chart, DataTable, FloatingActionBtn, Header } from '../../Components';
import { homeNavList, defaultStyle, FeatherIcons } from '../../Utils';
import { useTheme } from 'react-native-paper';
import { showAlert } from '../../Utils/CommonAuthFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_SUCCCESS } from '../../Redux/constants';
const Home = () => {
  const [dateRange, setDateRange] = useState({ label: 'Last 7 days' });
  const dispatch = useDispatch();
  const { colors, dark } = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.background,
    color: colors.text
  };
  const { isLoading, account } = useSelector(state => state.account);
  let { isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    const fetchEarnExpendData = async () => {
      const dateRange = homeNavList.filter(el => el.active == true);
      if(user && Object.keys(user).length === 0){
        user = JSON.parse(await AsyncStorage.getItem('user'));
        dispatch({type:USER_SUCCCESS,payload:user});
      };
      dispatch(getEarnExpendData(dateRange, user?.groupId ?? ""));
    };
    fetchEarnExpendData();
  }, [dateRange]);

  const navPressHandle = (navPress) => {
    homeNavList.map(el => el.label == navPress.label ? el.active = true : el.active = false);
    setDateRange(navPress);
  };

  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          <View style={styles.navigationContainer}>
            {homeNavList.map((ele, idx) => (
              <Pressable key={idx} onPress={() => navPressHandle(ele)}>
                <Text key={idx} style={ele.active ? { ...styles.activeNavText, backgroundColor: colors.notification, color: colors.primary } : { ...styles.navText, color: colors.text }}>{ele.label}</Text>
              </Pressable>
            ))}
          </View>
          {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> : <>
            <View style={defaultStyle.viewSection}>
              <Card containerStyle={{ ...styles.cardContainer, backgroundColor: colors.card }}>
                <View style={styles.cardTitle}>
                  <View>
                    <Text style={{ ...styles.cardLeftTitle, color: colors.text }}>Analytics</Text>
                  </View>
                  <View style={styles.cardRightTitle}>
                    <View>
                      <Text style={{ ...styles.cardRightText, color: colors.text }}>{dateRange.label}</Text>
                    </View>
                    <View style={{ ...styles.cardRightIconCont, borderColor: colors.text }}>
                      <FeatherIcons name='filter' color={colors.text} size={15} />
                    </View>
                  </View>
                </View>
                <View>
                  {!isLoading && account && account?.analyticsDetail && <>
                    {Object.keys(account?.analyticsDetail).map((el, idx) => (
                      <View key={idx + homeNavList.length} style={styles.analyticsDetails}>
                        <View><Text style={{ ...styles.analyticsText, color: colors.text }}>{el}</Text></View>
                        <View><Text style={{ ...styles.analyticsText, color: colors.text }}>₹{account.analyticsDetail[el] ? account.analyticsDetail[el] : 'NA'}</Text></View>
                      </View>
                    ))}
                  </>}
                </View>
              </Card>
              {!isLoading && account?.graphData && account?.graphData.labels && account?.graphData.labels.length > 0 && <>
                <View style={defaultStyle.viewSection}>
                  <Chart graphData={account?.graphData} />
                </View>
                <View>
                  <DataTable tableData={account.graphData} />
                </View></>}
            </View></>}
        </View>
      </ScrollView>
      <View style={styles.expensEarnBtn}>
        <FloatingActionBtn />
      </View>
      <View>
        <Header />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  toHeaderContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingBottom: 10,
  },
  navigationContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  navText: {
    fontSize: 14,
  },
  activeNavText: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 7
  },
  cardContainer: {
    padding: 15,
    margin: 0,
    borderRadius: 10,
    borderWidth: 0
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center'
  },
  cardLeftTitle: {
    fontSize: 18,
    fontSize: 20
  },
  cardRightTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRightText: {
    marginRight: 8,
  },
  cardRightIconCont: {
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 4
  },
  analyticsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  analyticsText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 30
  },
  expensEarnBtn: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    // flexDirection: 'row',
    // position: 'absolute',
    // justifyContent: 'space-between',
    // bottom: 0,
    // marginHorizontal: 22
  },
  earnExpensBtn: {
    // flexDirection:'row',
    // alignItems:'center',
    padding: 15,
    // borderRadius:20
  },
  earnExpensBtnText: {
    fontSize: 16,
    fontWeight: '600'
  },
  earnBtn: {
    backgroundColor: 'green'
  },
  expensBtn: {
    backgroundColor: 'red',
  }
})