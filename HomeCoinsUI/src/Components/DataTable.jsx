import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable, useTheme } from 'react-native-paper';

const Table = ({tableData,monthlyHandle}) => {
  const { colors,dark} = useTheme();
  const backgroundStyle = {
    tableHeaderStyle:{
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
	<DataTable.Header style={backgroundStyle.tableHeaderStyle}>
		<DataTable.Title textStyle={{color:backgroundStyle.tableHeaderStyle.color,fontWeight:'800'}}>Date</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.tableHeaderStyle.color}}>Earn</DataTable.Title>
		<DataTable.Title textStyle={{color:backgroundStyle.tableHeaderStyle.color}}>Expend</DataTable.Title>
    <DataTable.Title textStyle={{color:backgroundStyle.tableHeaderStyle.color}}>Savings</DataTable.Title>
    {/* <DataTable.Title textStyle={{color:backgroundStyle.tableHeaderStyle.color}}>Action</DataTable.Title> */}
	</DataTable.Header>
  {tableData && tableData.labels.map((el,idx)=>(
    <>
	<DataTable.Row key={idx} style={backgroundStyle.tableBodyStyle} onPress={()=>monthlyHandle(el,"Daily")}>
		<DataTable.Cell textStyle={{color:colors.text,fontWeight:'800'}}>{el}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:colors.text}}>{tableData.datasets[0].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:colors.text}}>{tableData.datasets[1].data[idx]}</DataTable.Cell>
		<DataTable.Cell textStyle={{color:colors.text}}>{tableData.datasets[0].data[idx] - tableData.datasets[1].data[idx]}</DataTable.Cell>
		{/* <DataTable.Cell textStyle={{color:colors.text}}>Action</DataTable.Cell> */}
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
