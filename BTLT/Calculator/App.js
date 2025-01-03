import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'; 

export default function App() {
  const [input, setInput] = useState(''); // Trạng thái để lưu trữ số đã nhập
  const [result, setResult] = useState(''); // Trạng thái lưu kết quả

  // Hàm xử lý khi bấm vào số
  const handlePress = (num) => {
    setInput(input + num); // Nối thêm số vào chuỗi input
  };

  // Hàm xử lý khi bấm toán tử
  const handleOperatorPress = (operator) => {
    if (input === '') return; // Không cho phép nhập toán tử nếu không có số trước đó
    setInput(input + operator); // Nối thêm toán tử vào chuỗi input
  };

  // Hàm tính toán kết quả
  const calculateResult = () => {
    try {
      let evalResult = eval(input); // Sử dụng eval để tính toán
      setResult(evalResult.toString()); // Hiển thị kết quả
    } catch (error) {
      setResult('Error'); // Hiển thị lỗi nếu có vấn đề với chuỗi nhập
    }
  };

  // Hàm xóa toàn bộ
  const clearAll = () => {
    setInput('');
    setResult('');
  };

  // Hàm xóa ký tự cuối cùng
  const clearLastEntry = () => {
    setInput(input.slice(0, -1)); // Xóa ký tự cuối cùng
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.screen}>
          <Text style={styles.inputText}>{input || '0'}</Text> 
          <Text style={styles.resultText}>{result || ''}</Text>        
        </View>

        {/* Dòng các nút */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={clearAll}>
            <Text style={styles.red}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearLastEntry}>
            <Text style={styles.red}>CE</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('%')}>
            <Text style={styles.yellow}>%</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('/')}>
            <Text style={styles.yellow}>/</Text>
          </TouchableOpacity>          
        </View>

        {/* Các hàng số */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
            <Text style={styles.num}>7</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
            <Text style={styles.num}>8</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
            <Text style={styles.num}>9</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('*')}>
            <Text style={styles.yellow}>x</Text>
          </TouchableOpacity>          
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
            <Text style={styles.num}>4</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
            <Text style={styles.num}>5</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
            <Text style={styles.num}>6</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('-')}>
            <Text style={styles.yellow}>-</Text>
          </TouchableOpacity>          
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
            <Text style={styles.num}>1</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
            <Text style={styles.num}>2</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
            <Text style={styles.num}>3</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('+')}>
            <Text style={styles.yellow}>+</Text>
          </TouchableOpacity>          
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
            <Text style={styles.num}>0</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
            <Text style={styles.yellow}>.</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={styles.ex} onPress={calculateResult}>
            <Text style={styles.equal}>=</Text>
          </TouchableOpacity>          
        </View>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    height: 250,
    backgroundColor: '#ddd',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 30,
    textAlign: 'right',
    color: '#000',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 40,
    textAlign: 'right',
    color: '#000',
  },
  main: {
    width: '90%',
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
  yellow: {
    color: '#FFBD23',
    fontWeight: 'bold',
    fontSize: 20,
  },
  ex: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 20,
    borderColor: 'transparent',
    borderRadius: 10,
    backgroundColor: '#FFBD23',
    margin: 5,
  },
  equal: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  num: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
