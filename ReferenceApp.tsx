// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React, {useState} from 'react';
// import type {PropsWithChildren} from 'react';

// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   // useColorScheme,
//   // View,
//   TextInput,
//   Button,
// } from 'react-native';

// // import {
// //   Colors,
// //   DebugInstructions,
// //   Header,
// //   ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';

// // type SectionProps = PropsWithChildren<{
// //   title: string;
// // }>;

// function App(): React.JSX.Element {
//   const [input1, setInput1] = useState('');
//   const [input2, setInput2] = useState('');
//   const [input3, setInput3] = useState('');
//   const [input4, setInput4] = useState('');
//   // const [result, setResult] = useState('');
//   const [result, setResult] = useState<number>(0);

//   const handlePress = () => {
//     // Here you can add the logic for calculation
//     // For example, adding the values:
//     setResult(
//       Number(input1) + Number(input2) + Number(input3) + Number(input4),
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={input1}
//         onChangeText={setInput1}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         value={input2}
//         onChangeText={setInput2}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         value={input3}
//         onChangeText={setInput3}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         value={input4}
//         onChangeText={setInput4}
//         keyboardType="numeric"
//       />
//       <Button title="Alculate" onPress={handlePress} />
//       <Text>Result: {result}</Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     width: '80%',
//   },
// });

// export default App;
