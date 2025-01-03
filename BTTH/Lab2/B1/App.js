//22521152 Huỳnh Minh Phước
import { StyleSheet } from 'react-native';
import Media from './Media';

export default function App() {
  return (
    <Media message="hi"/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
