import { StyleSheet ,Dimensions,useColorScheme} from 'react-native'

const width = Dimensions.get("window").width - 40;
export const defaultStyle = StyleSheet.create({
    screenContainer:{
        marginHorizontal:18,
        marginVertical:1
    },
    screenWidth:{
        width:width,
        marginVertical:'auto'
    },
    viewSection:{
        marginVertical:15
    },
    toHeaderContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        paddingBottom: 10,
    },
    topHeaderTitle:{
        fontSize: 20,
        fontWeight: '600'
    },
    earnExpensBtn:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        borderRadius:20
      },
      earnExpensBtnText:{
        fontSize:16,
        fontWeight:'600'
      },
      activityIndicator:{
        flex:1,
        justifyContent:'center',
    }
})