import React,{memo} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IncomeExpendSection = ({ account, colors, renderList, type }) => {
    const list = type === "Earn" ? (account.earnList || []) : (account.expendList || []);
    const totalAmount = list?.reduce((total, item) => total + parseFloat(item?.amount ?? 0), 0).toFixed(2);
    const styles = getStlyeSheet(colors);
    return (
        <View style={{ marginBottom: 10 }}>
            <View style={styles.headerStyle}>
                <Text style={styles.headerText}>{type === "Earn" ? "Total Income" : "Total Expend"}</Text>
                <Text style={styles.headerText}>₹{totalAmount || "0.00"}</Text>
            </View>
            <View>
                {list.length > 0 ? renderList(list, type) : (
                    <View style={styles.noDataFound}>
                        <Text style={{ color: colors.error }}>{type === "Earn" ? "Income" : "Expend"} Not Found</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const getStlyeSheet = (colors)=>{
    const styles =  StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: colors.HeaderBg,
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.HeaderText
    },
    noDataFound: {
        padding: 10,
        alignItems:'center',
        backgroundColor: colors.surfaceVariant
    }
    })
    return styles;
};

export default memo(IncomeExpendSection);
