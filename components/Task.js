import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({word, translation}) => {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.tran}>{translation}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  word: {
    width: '100%',
    fontSize: 19,
  },
  tran: {
    width: '100%',
    fontSize: 19,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;