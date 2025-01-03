import { StyleSheet, Text, View ,FlatList} from 'react-native';
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function App() {
  const [listcategories,setcategories]=useState([]);
  const Getallcategories = async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products/categories',
      );
      setcategories(response.data);
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };
  
  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <View>
        <Text
          style={styles.item}
          onPress={() => getItem(item)}>
          {item}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
          style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8'
          }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert(' Value: ' + item);
  };
  useEffect(() => {
    Getallcategories();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
          data={listcategories}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:20
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
