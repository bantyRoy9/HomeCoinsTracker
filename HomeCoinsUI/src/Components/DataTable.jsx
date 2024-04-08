import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable, useTheme } from 'react-native-paper';

const Table = ({tableData}) => {
  const { colors,dark} = useTheme();
  const backgroundStyle = {
    headerStyle:{
      backgroundColor:colors.HeaderBg,
      color:colors.HeaderText,
      borderBottomWidth:0,
    },
    tableBodyStyle:{
      backgroundColor: colors.surfaceVariant,
      borderBottomWidth:1,
      color:colors.text
    }
  };
return (
  
	<DataTable>
	<DataTable.Header style={backgroundStyle.headerStyle}>
		<DataTable.Title textStyle={{color:backgroundStyle.headerStyle.color,fontWeight:'800'}}>Date</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.headerStyle.color}}>Earn</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.headerStyle.color}}>Expend</DataTable.Title>
    <DataTable.Title textStyle={{color:backgroundStyle.headerStyle.color}}>Savings</DataTable.Title>
    <DataTable.Title textStyle={{color:backgroundStyle.headerStyle.color}}>Action</DataTable.Title>
	</DataTable.Header>
  {tableData && tableData.labels.map((el,idx)=>(
    <>
	<DataTable.Row key={idx} style={backgroundStyle.tableBodyStyle}>
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
