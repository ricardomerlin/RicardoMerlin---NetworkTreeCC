import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'

function App() {

  const [statesList, setStatesList] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [isStateSelected, setIsStateSelected] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/states')
      .then(response => response.json())
      .then(data => setStatesList(data))
      .catch(error => console.error('Error getting data:', error))
  }, [])

  const handleStateChange = ((itemValue) => {
    setSelectedState(itemValue)
    setIsStateSelected(itemValue !== '')
    setModalVisible(false)
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>State picker challenge</Text>
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
        style={[
          styles.dropdownButton,
          isStateSelected && styles.dropdownButtonSelected
        ]}
        onPress={() => setModalVisible(true)}
        >
          <View style={styles.columnLayout}>
            <Text style={isStateSelected ? styles.placeholderTextSmall : styles.placeholderText}>State</Text>
            {isStateSelected && (
              <Text style={[
                styles.dropdownButtonText,
                isStateSelected && styles.dropdownButtonTextSelected
              ]}>
                {selectedState}
              </Text>
            )}
          </View>
          <Text style={styles.downArrow}>⌄</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.doneButtonContainer}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
            <Picker
              selectedValue={selectedState}
              style={styles.picker}
              itemStyle={styles.item}
              onValueChange={handleStateChange}
            >
              {statesList.map((state, index) => (
                <Picker.Item key={index} label={state} value={state}/>
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '7%',
    marginTop: '18%'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownWrapper: {
    alignItems: 'center'
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  dropdownButtonSelected: {
    backgroundColor: 'aliceblue',
    borderColor: 'blue'
  },
  placeholderTextSmall: {
    fontSize: 8,
    color: 'grey',
  },
  placeholderText: {
    fontSize: 15,
    color: 'grey'
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'black'
  },
  dropdownButtonTextSelected: {
    color: 'blue'
  },
  columnLayout: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 30,
    justifyContent: 'center'

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center'
  },
  modalInner: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '100%',
  },
  picker: {
    height: 170
  },
  item: {
    fontSize: 15,
    color: 'black'
  },
  doneButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 15,

  },
  doneButtonText: {
    textAlign: 'right',
    color: 'blue',
    fontSize: 18,
  },
  downArrow: {
    fontSize: 20,
    position: 'absolute',
    color: 'grey',
    right: 20,
    top: 6
  }
})


export default App;
