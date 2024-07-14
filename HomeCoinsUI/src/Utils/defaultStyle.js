import { StyleSheet, Dimensions,PixelRatio } from 'react-native'

const width = Dimensions.get("window").width - 40;
export const viewHeight = Dimensions.get("window").height;
const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size/fontScale;
export const defaultStyle = StyleSheet.create({
  screenContainer: { marginHorizontal: 10, marginVertical: 1 },
  text: {fontSize: getFontSize(15)},
  flexRow:{justifyContent:'space-around',display:'flex',flexDirection:'row'},
  flex1:{flex:1,alignItems:'center',paddingVertical:8},
  textBold:{fontSize:getFontSize(15),fontWeight:'bold'},
  screenWidth: { width: width, marginVertical: 'auto' },
  viewSection: { marginVertical: 15 },
  toHeaderContainer: { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 20, paddingBottom: 10 },
  topHeaderTitle: { fontSize: 20, fontWeight: '600' },
  activityIndicator: { flex: 1, justifyContent: 'center', height: 'auto' },
  model: { borderColor: 'red', padding: 10, backgroundColor: 'white', marginHorizontal: 18, marginVertical: 1 },
  textBold: { fontWeight: '700', fontSize: getFontSize(16) },
  textWhite: { color: '#eeee' },
  selectpickerContainer: { marginVertical: 5 },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "100%",
    marginVertical: 15
  },
  viewBottom:{
    position:'absolute',
    bottom:0,
    width:'100%'
  },
  borderView:{
    borderWidth:1,
    borderColor:'red'
  }
})