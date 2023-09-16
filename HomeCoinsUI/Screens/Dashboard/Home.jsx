import { ScrollView, SafeAreaView, Dimensions, StyleSheet, Text, View, useColorScheme, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { } from 'react-native';
import { darkColorProps, lightColorProps } from '../../src/Utils/colorProp';
import Header from '../../src/Components/Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import Icons from 'react-native-vector-icons/FontAwesome';
import FeatherIcons from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { Card } from 'react-native-elements';
import { homeNavList } from '../../src/Utils/homeNavList';
import { MultipleLinesChartDecorator } from '../../src/Components/Chart/MultipleLinesChartDecorator';
import { Rect, Svg, Text as TextSVG } from 'react-native-svg';
const analyticsJson = {
  Earn: 1000,
  Expend: 400,
  Saving: 600
}

const Home = () => {
  const [getErns, setGetErns] = useState({});
  const [graphData, setGraphData] = useState(null);
  const [tooltip, setTooltip] = useState({
    x: 0, y: 0, visible: false, value: 0,color:''
  })
  const isDarkMode = useColorScheme() == "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  };

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const { data } = await axios.get('http://192.168.1.12:8000/api/v1/accountController/getEarnExpend?type=both');
        if (data.status && data.data) {
          getAnalyticsDetails(data.graphData)
          data.graphData.datasets.map((el, id) => el['color'] = function () { return data.graphData.datasets[id].colorCode })
          setGraphData(data.graphData);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchDate();
  }, [])
  const setColorProperty = (color) => { color }
  const getAnalyticsDetails = (resData) => {
    analyticsJson.Earn = resData.datasets[0].data.reduce((a, b) => a + b, 0);
    analyticsJson.Expend = resData.datasets[1].data.reduce((a, b) => a + b, 0);
    analyticsJson.Saving = analyticsJson.Earn - analyticsJson.Expend;
  }
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%' }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentContainerStyle={{ flex: 1 }} showsHorizontalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={{ flex: 1, marginHorizontal: 18 }}>
          <View style={styles.toHeaderContainer}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '600', color: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }}>Dashbord</Text>
            </View>
            <View style={{ position: 'relative' }}>
              <Icons name='bell' color={backgroundStyle.color} size={20} />
              <View style={{ position: 'absolute', width: 10, height: 10, borderRadius: 50, backgroundColor: 'red', right: 0 }}></View>
            </View>
          </View>
          <View style={styles.navigationContainer}>
            {homeNavList.map((ele, idx) => (
              <View key={`${idx}`}>
                <Text style={ele.active ? styles.activeNavText : styles.navText}>{ele.label}</Text>
              </View>
            ))}
          </View>
          <Text></Text>
          <View>
            <Card containerStyle={{ ...styles.cardContainer, backgroundColor: isDarkMode ? darkColorProps.cardBackground : lightColorProps.cardBackground }}>
              <View style={styles.cardTitle}>
                <View>
                  <Text style={styles.cardLeftTitle}>Analytics</Text>
                </View>
                <View style={styles.cardRightTitle}>
                  <View>
                    <Text style={styles.cardRightText}>Last 7 days</Text>
                  </View>
                  <View style={{ ...styles.cardRightIconCont, borderColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }}>
                    <FeatherIcons name='filter' style={{ ...styles.cardRightIcon, borderColor: isDarkMode ? darkColorProps.textColor : lightColorProps.textColor }} color={isDarkMode ? darkColorProps.textColor : lightColorProps.textColor} />
                  </View>
                </View>
              </View>
              <View>
                {analyticsJson && <>
                  {Object.keys(analyticsJson).map((el, idx) => (
                    <View key={`${idx}`} style={styles.analyticsDetails}>
                      <View><Text style={styles.analyticsText}>{el}</Text></View>
                      <View><Text style={styles.analyticsText}>₹{analyticsJson[el].toFixed(2)}</Text></View>
                    </View>
                  ))}
                </>}
              </View>
            </Card>
            <Text></Text>
            {graphData && <LineChart
              data={graphData}
              width={Dimensions.get("window").width - 30}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""

              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#000",
                backgroundGradientFrom: "#000",
                backgroundGradientTo: darkColorProps.cardBackground,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                // propsForDots: {
                //   r: "5",
                //   strokeWidth: "1",
                //   stroke: "red"
                // }
              }}
              bezier
              style={{
                borderRadius: 16
              }}
              decorator={() => {
                return tooltip.visible ? <View>
                  <Svg>
                    <Rect x={tooltip.x - 15}
                      y={tooltip.y + 10}
                      width="40"
                      height="30"
                      fill={tooltip.color} />
                    <TextSVG
                      x={tooltip.x + 5}
                      y={tooltip.y + 30}
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle">
                      {tooltip.value}
                    </TextSVG>
                  </Svg>
                </View> : null
              }}
              onDataPointClick={(data) => {
                let isSamePoint = (tooltip.x === data.x && tooltip.y === data.y)
                isSamePoint ? setTooltip((previousState) => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible,
                    color:data.colorCode
                  }
                })
                  :
                  setTooltip({ x: data.x, value: data.value, y: data.y, visible: true ,color:data.getColor()});
              }}

            />}
          </View>
        </View>
      </ScrollView>
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
    borderWidth: 2,
    borderRadius: 5,
    padding: 2
  },
  cardRightIcon: {
    fontSize: 15,
    fontWeight: '800',
  },
  analyticsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  analyticsText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 30
  }
})