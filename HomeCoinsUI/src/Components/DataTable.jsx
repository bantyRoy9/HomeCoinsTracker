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
  
	<DataTable>
	<DataTable.Header style={backgroundStyle.headerStyle}>
		<DataTable.Title textStyle={{color:backgroundStyle.color,fontWeight:'800'}}>Date</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.color}}>Earn</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.color}}>Expend</DataTable.Title>
    <DataTable.Title textStyle={{color:backgroundStyle.color}}>Savings</DataTable.Title>
    <DataTable.Title textStyle={{color:backgroundStyle.color}}>Action</DataTable.Title>
	</DataTable.Header>
  {tableData && tableData.labels.map((el,idx)=>(
    <>
	<DataTable.Row>
		<DataTable.Cell textStyle={{color:backgroundStyle.color,fontWeight:'800'}}>{el}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>{tableData.datasets[0].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>{tableData.datasets[1].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>{tableData.datasets[0].data[idx] - tableData.datasets[1].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:backgroundStyle.color}}>Action</DataTable.Cell>
	</DataTable.Row>
    </>
  ))}
	</DataTable>
);
};

export default Table;

const styles = StyleSheet.create({
tableHeader: {
	backgroundColor: '#DCDCDC',
},
});
