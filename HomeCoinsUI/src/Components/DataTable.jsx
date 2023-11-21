import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable, useTheme } from 'react-native-paper';

const Table = ({tableData}) => {
  const { colors,dark} = useTheme();
  const backgroundStyle = {
    headerStyle:{
      backgroundColor:colors.tableHeaderBackground,
      color:colors.text,
      borderBottomWidth:0
    },
    tableBodyStyle:{
      backgroundColor: colors.tableBodyBackground,
      color:colors.text
    }
  };
return (
  
	<DataTable>
	<DataTable.Header style={backgroundStyle.headerStyle}>
		<DataTable.Title textStyle={{color:colors.text,fontWeight:'800'}}>Date</DataTable.Title>
		<DataTable.Title textStyle={{color:colors.text}}>Earn</DataTable.Title>
		<DataTable.Title textStyle={{color:colors.text}}>Expend</DataTable.Title>
    <DataTable.Title textStyle={{color:colors.text}}>Savings</DataTable.Title>
    <DataTable.Title textStyle={{color:colors.text}}>Action</DataTable.Title>
	</DataTable.Header>
  {tableData && tableData.labels.map((el,idx)=>(
    <>
	<DataTable.Row key={idx}>
		<DataTable.Cell textStyle={{color:colors.text,fontWeight:'800'}}>{el}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:colors.text}}>{tableData.datasets[0].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:colors.text}}>{tableData.datasets[1].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:colors.text}}>{tableData.datasets[0].data[idx] - tableData.datasets[1].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:colors.text}}>Action</DataTable.Cell>
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
