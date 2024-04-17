import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncomeExpendSection = ({ account, colors, renderList, type }) => {
    const list = type === "Earn" ? (account.earnList || []) : (account.expendList || []);
    const totalAmount = list?.reduce((total, item) => total + parseFloat(item?.amount ?? 0), 0).toFixed(2);

    const headerStyle = {
        ...styles.headerStyle,
        backgroundColor: colors.HeaderBg,
        paddingHorizontal: 12,
        paddingVertical: 10
    };
    
    const headerTextStyle = {
        ...styles.headerText,
        color: colors.HeaderText
    };
    
    const noDataFoundStyle = {
        ...styles.noDataFound,
        justifyContent: 'center',
        backgroundColor: colors.surfaceVariant
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={headerStyle}>
                <Text style={headerTextStyle}>{type === "Earn" ? "Total Income" : "Total Expend"}</Text>
                <Text style={headerTextStyle}>₹{totalAmount || "0.00"}</Text>
            </View>
            <View>
                {list.length > 0 ? renderList(list, type) : (
                    <View style={noDataFoundStyle}>
                        <Text style={{ color: colors.error }}>{type === "Earn" ? "Income" : "Expend"} Not Found</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    noDataFound: {
        padding: 10
    }
});

export default IncomeExpendSection;
