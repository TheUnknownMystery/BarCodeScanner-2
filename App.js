import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createSwitchNavigator, createAppNavigator } from 'react-navigation'
import ScanPage from './Screens/ScanScreen'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <ScanPage/>
      </View>
    )
  }
}
