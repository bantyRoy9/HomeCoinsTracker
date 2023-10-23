import { ScrollView, ActivityIndicator, SafeAreaView, StyleSheet, Pressable, Text, View, useColorScheme, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getEarnExpendData } from '../../Redux/Action/accountAction';
import { Chart, DataTable, FloatingActionBtn, Header } from '../../Components';
import { darkColorProps, lightColorProps,homeNavList,defaultStyle,FeatherIcons,FontAwesome } from '../../Utils';
const Home = () => {
  const [dateRange, setDateRange] = useState({ label: 'Last 7 days' });
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() == "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };
  const { isLoading, account } = useSelector(state => state.account);
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    const dateRange = homeNavList.filter(el => el.active == true);
    dispatch(getEarnExpendData(dateRange, isAuthenticated));
  }, [dateRange]);

  const navPressHandle = (navPress) => {
    homeNavList.map(el => {
      if (el.label == navPress.label) {
        el.active = true
      } else {
        el.active = false
      }
    });
    setDateRange(navPress);
  }

  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          <View style={styles.toHeaderContainer}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '600', color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }}>Dashbord</Text>
            </View>
            <View style={{ position: 'relative' }}>
              <FontAwesome name='bell' color={backgroundStyle.color} size={20} />
              <View style={{ position: 'absolute', width: 10, height: 10, borderRadius: 50, backgroundColor: 'red', right: 0 }}></View>
            </View>
          </View>
          <View style={styles.navigationContainer}>
            {homeNavList.map((ele, idx) => (
              <Pressable key={`${idx}${ele}`} onPress={() => navPressHandle(ele)}>
                <Text style={ele.active ? styles.activeNavText : styles.navText}>{ele.label}</Text>
              </Pressable>
            ))}
          </View>
          {isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={isDarkMode ? darkColorProps.loaderColor : lightColorProps.loaderColor} /></View> : <>
            <View style={defaultStyle.viewSection}>
              <Card containerStyle={{ ...styles.cardContainer, backgroundColor: isDarkMode ? darkColorProps.cardBackground : lightColorProps.cardBackground }}>
                <View style={styles.cardTitle}>
                  <View>
                    <Text style={styles.cardLeftTitle}>Analytics</Text>
                  </View>
                  <View style={styles.cardRightTitle}>
                    <View>
                      <Text style={styles.cardRightText}>{dateRange.label}</Text>
                    </View>
                    <View style={{ ...styles.cardRightIconCont, borderColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }}>
                      <FeatherIcons name='filter' color={isDarkMode ? darkColorProps.textColor : lightColorProps.textColor} size={15} />
                    </View>
                  </View>
                </View>
                <View>
                  {!isLoading && account && account?.analyticsDetail && <>
                    {Object.keys(account?.analyticsDetail).map((el, idx) => (
                      <View key={`${idx}${el}`} style={styles.analyticsDetails}>
                        <View><Text style={styles.analyticsText}>{el}</Text></View>
                        <View><Text style={styles.analyticsText}>₹{account.analyticsDetail[el] ? account.analyticsDetail[el]:'NA'}</Text></View>
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
      <View>
          <View>
          </View>
        <View style={{ ...defaultStyle.viewSection }}>
          <View style={{ ...styles.expensEarnBtn, ...defaultStyle.screenWidth }}>
            <Pressable style={{ ...defaultStyle.earnExpensBtn }}>
              {/* <Text style={defaultStyle.earnExpensBtnText}><Icons6 name='hand-holding-dollar' size={16} /> Add Earn</Text> */}
            </Pressable>
            <FloatingActionBtn/>
          </View>
        </View>
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
    marginVertical: 6
  },
  navText: {
    fontSize: 14,
  },
  activeNavText: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: 7,
    fontWeight: '600'
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
    fontWeight: '500',
    fontSize: 20
  },
  cardRightTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRightText: {
    marginRight: 8,
    fontWeight: '500'
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
    zIndex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: 0,
    marginHorizontal: 22
  },

  earnBtn: {
    backgroundColor: 'green'
  },
  expensBtn: {
    backgroundColor: 'red',
  }
})