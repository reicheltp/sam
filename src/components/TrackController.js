/* @flow */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  List, ListItem,
} from 'react-native-elements';
import {ListView} from 'realm/react-native';

import {Music, Player} from '../services';

class TrackController extends Component {
  render(){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      </View>
    );
  }
}

export default TrackController;