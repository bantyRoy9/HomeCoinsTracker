import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import moment from 'moment';
import { getActivity } from '../../Redux/Action/activityAction';
import { showAlert, stringTransform, defaultStyle } from '../../Utils';
import { dateFormat, filterKeyIncludeArr, getElementByIndex } from '../../Utils/CommonAuthFunction';
import DataNotFound from '../../Components/DataNotFound';

const Activity = () => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { isLoading, activity } = useSelector(state => state.activity);
    const { user } = useSelector(state => state.user);
    const { source } = useSelector(state => state.source);
    const [page, setPage] = useState(1);


    useEffect(() => {
        loadData(page);
    }, [page]);
    useLayoutEffect(()=>{
        loadData(page);
    },[])
    const loadData = async (page) => {
        try {
           dispatch(getActivity(user?.groupId, page));
        } catch (err) {
            console.log(err);
            showAlert(err.response.data.message);
        }
    };

    const loadMoreData = () => {
        if (!isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const renderFooter = () => {
        return isLoading ? (
            <View style={defaultStyle.activityIndicator}>
                <ActivityIndicator size="large" color={colors.text} />
            </View>
        ) : null;
    };

    const renderItem = ({ item, index }) => (
        <View key={index}>
            <Pressable style={{ ...styles.activityLists, borderBottomColor: colors.border, borderBottomWidth: activity.data.length - 1 > index ? 1 : 0 }}>
                <View style={styles.activityList}>
                    <View style={styles.activityLeftSec}>
                        <View style={styles.activityProfileList}>
                            <Image source={require('../../../Assets/profiles/default.png')}
                                style={{ width: 40, height: 40, borderRadius: 8 }}
                            />
                        </View>
                        <View>
                            {item.Url === "/earn" && <>
                                <View><Text style={{ color: colors.text }}>Earn By</Text></View>
                                <View><Text style={{ color: colors.text }}>{stringTransform(getElementByIndex(filterKeyIncludeArr(source, "_id", item.addEarn?.source), 0, "sourceName"), 'c')}</Text></View>
                            </>}
                            {item.Url === "/expend" && <>
                                <View><Text style={{ color: colors.text }}>Expend to</Text></View>
                                <View><Text style={{ color: colors.text }}>{item.addExpend?.description ?? 'NA'}</Text></View>
                            </>}
                        </View>
                    </View>
                    <View style={styles.activityRightSec}>
                        <Text style={{ color: item.Url === "/expend" ? colors.error : item.methodType === "PATCH" ? colors.warning : colors.success }}>
                            {`${item.Url === "/expend" ? '- ₹' + (item.addExpend?.amount ?? "NA") : '+ ₹' + (item.addEarn?.amount ?? "NA")} `}
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ color: colors.text }}>{item.updatedDate ? dateFormat("DD MMM YY hh:mm a", item.updatedDate) : item.date ? dateFormat("DD MMM YY hh:mm a", item.date) : 'NA'}</Text>
                    </View>
                    <View>
                        <Text style={{ color: colors.text }}>{`${item.methodType === "PATCH" ? "Updated" : "Added"} By ${stringTransform(item.user?.name, 'C')} `}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
console.log(activity);
    return (
        <>
        {(activity && activity.length) ? (
            <>
                <FlatList
                    data={activity.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
                {/* {(isLoading && page === 1) && <View style={defaultStyle.activityIndicator}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>} */}
                </>
            ) : (
                <DataNotFound />
            )}
        </>
    );
}

export default Activity;

const styles = StyleSheet.create({
    activityLists: {
        paddingVertical: 15,
        gap: 10
    },
    activityList: {
        flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'
    },
    activityLeftSec: {
        flexDirection: 'row', justifyContent: "space-between", gap: 10
    },
    activityRightSec: {},
    activityProfileList: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#3d3d3d"
    },
});
