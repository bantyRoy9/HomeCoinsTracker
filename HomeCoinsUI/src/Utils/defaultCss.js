import { StyleSheet ,Dimensions} from 'react-native'

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
    
      activityIndicator:{
        flex:1,
        justifyContent:'center',
        height:'auto'
    },
    model:{
        borderColor:'red',
        padding:10,
        backgroundColor:'white',
        marginHorizontal:18,
        marginVertical:1
    },
    textBold:{
        fontWeight:'700',
        fontSize:16
    },
    textWhite:{
        color:'#eeee'
    }
})