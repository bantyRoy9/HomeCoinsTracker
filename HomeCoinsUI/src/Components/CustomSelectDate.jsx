import {useState, memo, useCallback, useEffect} from 'react';
import {getMonthLists, getYearLists} from '../Utils/CommonAuthFunction';
import SelectPicker from './SelectPicker';
import {FlatList, Pressable, View} from 'react-native';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import moment from 'moment';

const CustomSelectDate = ({mode,handleConfirm}) => {
  const [yearLists, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const onValueChange = useCallback(e => {}, [year]);
  const pressHandler = month => {
    const monthIndx = monthList.indexOf(month);
    const startDate = moment([year, monthIndx]).startOf('month').format('YYYY-MM-DD');
    const endDate = moment([year, monthIndx]).endOf('month').format('YYYY-MM-DD');
   handleConfirm(`${startDate}_${endDate}`,mode)
  };
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(`${currentYear}`);
    setYearList(getYearLists(currentYear, currentYear - 10));
    setMonthList(getMonthLists(2024, 'M'));
  }, []);

  return (
    <View style={styles.container}>
      <SelectPicker
        onValueChange={e => onValueChange(e, 'year')}
        placeholder="Select Year"
        value={year}
        items={yearLists.map(el => ({
          label: el.toString(),
          value: el.toString(),
        }))}
        icon={'calendar'}
      />
      <View>
        <FlatList
          data={monthList}
          renderItem={({item}) => (
            <Pressable onPress={() => pressHandler(item)} style={styles.cell}>
              <Text>{item}</Text>
            </Pressable>
          )}
          numColumns={'3'}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
};
export default memo(CustomSelectDate);

const styles = StyleSheet.create({
  monthContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    paddingVertical: 20,
  },
  cell: {
    flex: 1,
    height: 'auto',
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
});
