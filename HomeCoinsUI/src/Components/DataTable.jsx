import React from 'react';
import { StyleSheet,useColorScheme,View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { darkColorProps, lightColorProps } from '../Utils/colorProp';
import { defaultStyle } from '../Utils/defaultCss';

const Table = ({tableData}) => {
  const isDarkMode = useColorScheme()=='dark';
  const backgroundStyle = {
    headerStyle:{
      backgroundColor:isDarkMode? darkColorProps.tableHeaderBackground:lightColorProps.tableHeaderBackground,
      color:isDarkMode?darkColorProps.textColor:lightColorProps.textColor,
      borderBottomWidth:0
    },
    tableBodyStyle:{
      backgroundColor: isDarkMode ? darkColorProps.tableBodyBackground : lightColorProps.tableBodyBackground,
      color:isDarkMode ? darkColorProps.textColor : lightColorProps.textColor
    }
  };
  console.log(tableData);
return (
  <View style={defaultStyle.screenContainer}>
	<DataTable>
	<DataTable.Header style={backgroundStyle.headerStyle}>
		<DataTable.Title textStyle={{color:backgroundStyle.color}}>Date</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.color}}>Earn</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.color}}>Expend</DataTable.Title>
    <DataTable.Title textStyle={{color:backgroundStyle.color}}>Savings</DataTable.Title>
    <DataTable.Title textStyle={{color:backgroundStyle.color}}>Action</DataTable.Title>
	</DataTable.Header>

	<DataTable.Row>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>Radhika</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>Dosa</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>23</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>23</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>23</DataTable.Cell>
	</DataTable.Row>
	
	</DataTable>
  </View>
);
};

export default Table;

const styles = StyleSheet.create({
tableHeader: {
	backgroundColor: '#DCDCDC',
},
});
