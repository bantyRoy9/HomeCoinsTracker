import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import DataNotFound from '../../Components/DataNotFound';
import { getActivity } from '../../Redux/Action/activityAction';
import { defaultStyle, showAlert, stringTransform } from '../../Utils';
import { dateFormat, filterKeyIncludeArr, getElementByIndex } from '../../Utils/CommonAuthFunction';
import { viewHeight } from '../../Utils/defaultStyle';

const Activity = () => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { isLoading, activity } = useSelector(state => state.activity);
    const { user } = useSelector(state => state.user);
    const { source } = useSelector(state => state.source);
    const [page, setPage] = useState(1);
    const [listHeight, setListHeight] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(viewHeight);


console.log(isLoading);
    useEffect(() => {
        loadData(page);
    }, [page]);

    const loadData = async(page) => {
        try {
           await dispatch(getActivity(user?.groupId, page));
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
        <View key={index} style={defaultStyle.screenContainer}>
            <Pressable style={{ ...styles.activityLists, borderBottomColor: colors.border, borderBottomWidth: activity.length - 1 > index ? 1 : 0 }}>
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
    const onLayout = (event) =>{
        const { height } = event.nativeEvent.layout;
        setListHeight(height);
    }
    return (
        <>
        {(activity && activity.length>0) ? (
            <>
                <View  onLayout={onLayout} style={{ flex: 1 }}>
                <FlatList
                    data={activity}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    onEndReached={()=>{
                        // if(viewportHeight<listHeight){
                           loadMoreData()
                        // }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
                {(isLoading && page === 1) && <View style={defaultStyle.activityIndicator}>
                    <ActivityIndicator size="large" color={colors.text} />
                </View>}
                </View>
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
