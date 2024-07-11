import React, {useState} from 'react';
// import type {PropsWithChildren} from 'react';

import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
interface ScoreEntry {
  grade: string;
  score: number;
}

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function App(): React.JSX.Element {
  const [alcoholInput, setAlcoholInput] = useState('');
  const [volumeInput, setVolumeInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [result, setResult] = useState<number>(0);
  const [grade, setGrade] = useState<string>('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [unit, setUnit] = useState('mL');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'mL', value: 'mL'},
    {label: 'oz', value: 'oz'},
    {label: 'shot', value: 'shot'},
  ]);
  const [history, setHistory] = useState<ScoreEntry[]>([]);

  const convertVolumeToMilliliters = (
    volume: string,
    selectedUnit: string,
  ): number => {
    const numericVolume = parseFloat(volume);
    switch (selectedUnit) {
      case 'oz':
        return numericVolume * 29.5735; // Convert ounces to milliliters
      case 'shot':
        return numericVolume * 44.3603; // Convert quarts to milliliters
      default:
        return numericVolume; // If the unit is milliliters, no conversion is needed
    }
  };

  const handleAlcoholInputChange = (text: string) => {
    // Allow only numeric values and decimal point
    const newText = text.replace(/[^0-9.]/g, '');
    // Split the input into parts based on the decimal point
    const parts = newText.split('.');
    // Limit the integer part to 2 digits
    if (parts[0].length > 2) {
      parts[0] = parts[0].slice(0, 2);
    }

    // Rejoin the parts with the decimal point, and handle the case where there's no decimal part
    const formattedText = parts[0] + (parts.length > 1 ? '.' + parts[1] : '');
    setAlcoholInput(formattedText);
  };

  const getGradeColor = (grade: string): string => {
    if (
      grade === 'A+' ||
      grade === 'A' ||
      grade === 'A-' ||
      grade === 'B+' ||
      grade === 'B'
    ) {
      return '#00BD1E';
    }
    return 'red';
  };

  const getGrade = (calculatedResult: number): string => {
    if (calculatedResult >= 1800) {
      return 'wow. check for errors.';
    } else if (calculatedResult >= 1300 && calculatedResult < 1800) {
      return 'A+';
    } else if (calculatedResult >= 1000 && calculatedResult < 1300) {
      return 'A';
    } else if (calculatedResult >= 850 && calculatedResult < 1000) {
      return 'A-';
    } else if (calculatedResult >= 700 && calculatedResult < 850) {
      return 'B+';
    } else if (calculatedResult >= 600 && calculatedResult < 700) {
      return 'B';
    } else if (calculatedResult >= 500 && calculatedResult < 600) {
      return 'B-';
    } else if (calculatedResult >= 400 && calculatedResult < 500) {
      return 'C+';
    } else if (calculatedResult >= 300 && calculatedResult < 400) {
      return 'C';
    } else if (calculatedResult >= 200 && calculatedResult < 300) {
      return 'C-';
    } else if (calculatedResult >= 100 && calculatedResult < 200) {
      return 'D';
    } else {
      return 'F :(';
    }
  };

  const handlePress = () => {
    if (!alcoholInput || !volumeInput || !quantityInput || !priceInput) {
      Alert.alert('Please fill in all fields');
      return;
    }
    // Convert the volume input based on the selected unit before calculation
    const adjustedVolume = convertVolumeToMilliliters(volumeInput, unit);
    const calculation = Math.round(
      (Number(alcoholInput) * adjustedVolume * Number(quantityInput)) /
        Number(priceInput),
    );

    const nextGrade = getGrade(calculation);

    // Check for non-numeric inputs
    if (
      isNaN(Number(alcoholInput)) ||
      isNaN(Number(volumeInput)) ||
      isNaN(Number(quantityInput)) ||
      isNaN(Number(priceInput))
    ) {
      Alert.alert('Please enter valid numbers');
      return;
    }

    // Validate priceInput
    if (!priceInput.match(/^\d*\.?\d{0,2}$/)) {
      Alert.alert('Invalid price input');
      return;
    }

    // Additional check for division by zero
    if (Number(priceInput) === 0) {
      Alert.alert('Price cannot be zero');
      return;
    }

    // If the current grade is not empty, add it to the history
    if (grade !== '') {
      setHistory(prevHistory =>
        [
          {grade, score: result}, // Add the previous result to the history
          ...prevHistory,
        ].slice(0, 4),
      ); // Keep only the last 4 entries
    }

    // Set the current calculation result and grade
    setResult(calculation);
    setGrade(nextGrade);

    setIsButtonPressed(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAwareScrollView contentContainerStyle={styles.container}>  */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.spacer} />
          <Text style={styles.header}>the alculator</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>alcohol %:</Text>
            <TextInput
              style={styles.input}
              value={alcoholInput}
              onChangeText={handleAlcoholInputChange}
              keyboardType="numeric"
              placeholder="enter a %"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>quantity:</Text>
            <TextInput
              style={styles.input}
              value={quantityInput}
              onChangeText={setQuantityInput}
              keyboardType="number-pad"
              placeholder="e.g. 1, 12, 55"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>volume:</Text>
            <View style={styles.volumeContainer}>
              <TextInput
                style={styles.input}
                value={volumeInput}
                onChangeText={setVolumeInput}
                keyboardType="decimal-pad"
                placeholder="e.g. 355"
                placeholderTextColor="#A9A9A9"
              />
              <DropDownPicker
                style={[styles.picker, {zIndex: 5000}]} // Ensuring dropdown is above other elements
                open={open}
                value={unit}
                items={items}
                setOpen={setOpen}
                setValue={setUnit}
                setItems={setItems}
                dropDownContainerStyle={{width: '25%'}}
                dropDownDirection="TOP" // If there's more space above the field, otherwise remove this line
              />
            </View>
          </View>

          <View style={[styles.inputGroup, styles.lastInputGroup]}>
            <Text style={styles.label}>price:</Text>
            <TextInput
              style={styles.input}
              value={priceInput}
              onChangeText={setPriceInput}
              keyboardType="numeric"
              placeholder="$"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>alculate</Text>
          </TouchableOpacity>
          {isButtonPressed && (
            <>
              <Text style={styles.resultText}> {'\n'} grade: </Text>
              <Text style={[styles.gradeText, {color: getGradeColor(grade)}]}>
                {grade}
              </Text>
              <Text style={styles.resultText}>exact score: {result}</Text>
              <Text style={styles.finePrintText}>(higher is cheaper!)</Text>
              {history.length > 0 && ( // Check if there's more than one entry in the history
                <View style={styles.historyContainer}>
                  <Text style={styles.historyHeader}>
                    history (most recent at top):
                  </Text>
                  {history.map((entry, index) => (
                    <Text key={index} style={styles.historyText}>
                      grade: {entry.grade} (score: {entry.score})
                    </Text>
                  ))}
                </View>
              )}
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    fontFamily: 'Bukhari Script',
    fontWeight: 'normal',
    color: 'black', // or any color you prefer
    // Add any other styling you want for your default text
  },
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#C8FFFF', // Soft cyan blue
  },

  imageContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    // marginBottom: 0, // Adjust this value as needed
  },
  titleImage: {
    width: 320, // Adjust width to desired size
    height: 80, // Adjust height to desired size
    resizeMode: 'contain', // Ensures the image fits within the specified width and height
    marginBottom: 0,
    marginTop: 20,
  },
  spacer: {
    height: 20, // Adjust this value to control the space
  },
  inputGroup: {
    marginLeft: '9%',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start', // Aligns children to the start of the container
    marginVertical: 3,
  },
  label: {
    // marginRight: 20,
    paddingTop: 10,
    // marginLeft: 20,
    fontSize: 16,
    fontFamily: 'Arial Rounded MT Bold',
    width: 100, // You can adjust this width based on your label's length
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    justifyContent: 'flex-start',
    width: '100%', // Ensure this container takes up full width
    // You may need to adjust padding or margin here
  },
  input: {
    width: '35%', // Half width
    fontSize: 16,
    borderWidth: 1,
    fontFamily: 'Arial Rounded MT Bold',
    padding: 10,
    height: 40,
    marginRight: 5, // Adjust as needed
  },
  header: {
    fontSize: 40,
    fontFamily: 'Bukhari Script', // Replace with your actual font name
    color: '#303030',
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 0,
    // marginBottom: 0,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 250, // Adjust this value to make the button smaller
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Bukhari Script', // Replace with your actual font name
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Arial Rounded MT Bold', // Replace with your actual font name
    // Other styling as needed
    // marginTop: -20,
  },
  finePrintText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Arial', // Replace with your actual font name
    fontStyle: 'italic',
  },
  gradeText: {
    fontSize: 28,
    textAlign: 'center',
    color: 'red',
    fontFamily: 'Arial Rounded MT Bold', // Replace with your actual font name
    // Other styling as needed
  },
  picker: {
    zIndex: 1000,
    height: 10,
    fontSize: 18,
    // borderWidth: 1,
    width: '25%', // Adjust based on space left by the input
  },
  lastInputGroup: {
    marginBottom: 5, // Adjust this value to the space you need
  },
  historyContainer: {
    marginTop: 5,
  },
  historyText: {
    fontSize: 14,
    fontFamily: 'Arial Rounded MT Bold',
    color: 'black',
    marginLeft: 30,
  },
  historyHeader: {
    fontSize: 20,
    fontFamily: 'Arial Rounded MT Bold',
    color: 'black',
    textAlign: 'left', // or 'left', depending on your design preference
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 30,
  },
  inner: {
    flex: 1,
    // justifyContent: 'space-between',
  },
});

export default App;
