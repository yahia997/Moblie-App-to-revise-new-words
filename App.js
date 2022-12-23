import React, { useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  AsyncStorage
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [word, setWord] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [translation, setTranslation] = useState("");
  const [add, setAdd] = useState(true);
  const [editIndex, setEditIndex] = useState();
  
 _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value !== null) {
          // We have data!!
        setTaskItems(JSON.parse(value));
    }
  } catch (error) {
    // Error retrieving data
  }
};
  
  useEffect(() => {
    _retrieveData();
  }, []);
  
  _storeData = async () => {
  try {
    await AsyncStorage.setItem(
      '@MySuperStore:key',
      JSON.stringify(taskItems)
    );
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
    _storeData();
}, [taskItems, setTaskItems]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if(add) {
      setTaskItems([...taskItems, {word: word, translation: translation}]);
      setWord(null);
      setTranslation(null);
    }else {
      let itemsCopy = [...taskItems];
      itemsCopy[editIndex].word = word;
      itemsCopy[editIndex].translation = translation;
      setTaskItems(itemsCopy);
      setAdd(true);
      setWord(null);
      setTranslation(null);
    }
  };

  const removeWord = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); 
    setTaskItems(itemsCopy);
  };
  
  const editWord = (index) => {
    setWord(taskItems[index].word);
    setTranslation(taskItems[index].translation);
    setAdd(false);
    setEditIndex(index);
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Your Words</Text>
          <View style={styles.items}>
            {/* This is where the tasks will go! */}
            {taskItems.map((obj, index) => {
              return (
                <View key={index} style={{
                    backgroundColor: '#FFF',
                    padding: 10,
                    borderRadius: 10,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                }}>
                  <Task word={obj.word} translation={obj.translation} />
                  
                  <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    height: 40,
                    marginTop: 5,
                  }}>
                  <TouchableOpacity onPress={() => removeWord(index)}>
                    <View style={styles.remove}>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>Remove</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => editWord(index)}>
                    <View style={styles.edit}>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>Edit</Text>
                    </View>
                  </TouchableOpacity>
        
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <View style={{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: '100%'
        }}>
         <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{add ? "+" : "edit"}</Text>
          </View>
        </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={'Write a word'}
            value={word}
            onChangeText={(text) => setWord(text)}
          />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder={'Write a translation'}
          value={translation}
          onChangeText={(text) => setTranslation(text)}
        />

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
    paddingBottom: 130
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 5,
    direction: 'rtl',
    backgroundColor: '#FFF',
    borderColor: '#363b53',
    borderTopWidth: 2
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10, 
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '80%',
    height: 50
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#7c5dfa',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  edit: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 7,
    backgroundColor: '#7c5dfa',
    paddingHorizontal: 15,
    flex: 1,
    jusfiyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 7,
    backgroundColor: '#2d257e',
    paddingHorizontal: 15,
    flex: 1,
    jusfiyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  addText: {
    color: 'white',
    fontSize: 20
  },
});
