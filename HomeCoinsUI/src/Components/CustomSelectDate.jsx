import { useState,memo, useCallback, useEffect } from "react";
import { getMonthLists, getYearLists } from "../Utils/CommonAuthFunction";
import SelectPicker from "./SelectPicker";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const CustomSelectDateModal = ({mode}) => {
    const [yearLists,setYearList]=useState([]);
    const [monthList,setMonthList]=useState([]);
    const [year,setYear]=useState({label:2024,value:2024});
    const onValueChange= useCallback((e)=>{
  debugger    
  
    },[year]);
    const pressHandler = (idx) =>{
  
    }
    useEffect(()=>{
      const currentYear = new Date().getFullYear();
      setYear({label:currentYear,value:currentYear});
      setYearList(getYearLists(currentYear,currentYear - 10));
      setMonthList(getMonthLists(2024,"M"));
    },[])
    console.log(yearLists,monthList);
    return (
      <View style={styles.container}>
        <View>
         <SelectPicker value={"2023"} placeholder={"Select Year"} icon={'calendar'} items={yearLists.map(el=>({label:el,value:el}))} onValueChange={(e)=>onValueChange(e,"year")}/>
        </View>
        <View>
          <View>
            {monthList.map((el,idx)=>(
              <Pressable onPress={pressHandler}><Text>{el}</Text></Pressable>
            ))}
          </View>
        </View>
        {/* <FlatList
          data={monthList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>{item}</Text>
            </View>
          )}
        /> */}
      </View>
    );
  };
  export default memo(CustomSelectDateModal)

  const styles = StyleSheet.create({

  })