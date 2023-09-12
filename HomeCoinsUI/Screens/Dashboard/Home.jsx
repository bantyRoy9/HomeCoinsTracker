import { ScrollView, SafeAreaView, Dimensions, StyleSheet, Text, View, useColorScheme, StatusBar } from 'react-native'
import React, { useState,useEffect } from 'react'
import { } from 'react-native';
import { darkColorProps, lightColorProps } from '../../src/Utils/colorProp';
import Header from '../../Components/Header';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Icons from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Home = () => {
  const [getErns,setGetErns] = useState({});
  const [graphData,setGraphData] = useState(null);
  useEffect(()=>{
    const fetchDate = async()=>{
      const { data } = await axios.get('http://192.168.1.12:8000/api/v1/accountController/earn');
      if(data.status && data.data){
        
        setGraphData(data.graphData)
      };
    };
    fetchDate();
  },[])
  const isDarkMode = useColorScheme() == "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkColorProps.background : lightColorProps.background,
    color:isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
  }
  return (
    <SafeAreaView style={{ ...backgroundStyle, height: '100%'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView contentContainerStyle={{ flex: 1 }} showsHorizontalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={{ flex: 1,marginHorizontal:18}}>
          <View style={styles.toHeaderContainer}>
            <View>
              <Text style={{fontSize:20,fontWeight:'600'}}>Dashbord</Text>
            </View>
            <View style={{position:'relative'}}>
              <Icons name='bell' color={backgroundStyle.color} size={20}/>
              <View style={{position:'absolute',width:10,height:10,borderRadius:50,backgroundColor:'red',right:0}}></View>
            </View>
          </View>
          <View>
            <Text>
              

            </Text>
           {graphData && <LineChart
              data={graphData}
              width={Dimensions.get("window").width-30}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#000",
                backgroundGradientFrom: "#000",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                borderRadius: 16
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
  toHeaderContainer:{
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    marginTop:20,
    paddingBottom:10,
  },

})