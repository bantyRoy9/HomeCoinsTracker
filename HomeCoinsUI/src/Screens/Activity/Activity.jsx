import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import moment from 'moment';
import { getActivity } from '../../Redux/Action/activityAction';
import { showAlert,stringTransform,defaultStyle } from '../../Utils';
import { dateFormat, filterKeyIncludeArr, getElementByIndex } from '../../Utils/CommonAuthFunction';

const Activity = () => {
    const dispatch = useDispatch(),
        { colors } = useTheme(),
        { isLoading, activity } = useSelector(state => state.activity),
        { user } = useSelector(state=> state.user),
        { source } = useSelector(state=>state.source);
    useEffect(() => {
        try{
            dispatch(getActivity(user?.groupId));
        }catch(err){
            showAlert(err);
        }
    }, []);
    
    return (
        <>{isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View> :
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={defaultStyle.screenContainer}>
                        {activity && activity.data && activity?.data.map((el, idx) => (
                            <View key={idx}>
                                <Pressable style={{...styles.activityLists,borderBottomColor:colors.border,borderBottomWidth:activity.data.length - 1 > idx?1:0}}>
                                    <View style={styles.activityList}>
                                        <View style={styles.activityLeftSec}>
                                            <View style={styles.activityProfileList}>
                                                <Image source={require('../../../Assets/profiles/default.png')}
                                                    style={{ width: 40, height: 40, borderRadius: 8 }}
                                                />
                                            </View>
                                            <View>
                                                {el.Url == "/earn" && <>
                                                    <View><Text style={{color:colors.text}}>Earn By</Text></View>
                                                    <View><Text style={{color:colors.text}}>{stringTransform(getElementByIndex(filterKeyIncludeArr(source,"_id",el.addEarn?.source),0,"sourceName"),'c')}</Text></View>
                                                </>}
                                                {el.Url == "/expend" && <>
                                                    <View><Text style={{color:colors.text}}>Expend to</Text></View>
                                                    <View><Text style={{color:colors.text}}>{el.addExpend?.description ?? 'NA'}</Text></View>
                                                </>}
                                            </View>
                                        </View>
                                        <View style={styles.activityRightSec}>
                                            <Text style={{color: el.Url == "/expend" ? colors.error : el.methodType === "PATCH" ? colors.warning : colors.success}}>{`${el.Url == "/expend" ? '- ₹' + el.addExpend?.amount ?? "NA" + '' : '+ ₹' + el.addEarn?.amount ?? "NA" + ''} `}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <View>
                                            <Text style={{color:colors.text}}>{el.updatedDate ? dateFormat("DD MMM YY hh:mm a",el.updatedDate) : el.date ? dateFormat("DD MMM YY hh:mm a",el.date) : 'NA'}</Text>
                                        </View>
                                        <View>
                                            <Text style={{color:colors.text}}>{`${el.methodType === "PATCH" ? "Updated" : "Added"} By ${stringTransform(el.user?.name, 'C')} `}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        ))}
                </ScrollView>
            }
        </>
    )
}

export default Activity

const styles = StyleSheet.create({
    activityLists: {
        paddingVertical: 15,
        gap:10
    },
    activityList: {
        flexDirection:'row',justifyContent:"space-between",alignItems:'center'
    },
    activityLeftSec:{
        flexDirection:'row',justifyContent:"space-between",gap:10
    },
    activityRightSec:{

    },
    activityProfileList: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#3d3d3d"
    },
})