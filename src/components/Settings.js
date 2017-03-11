import React from 'react';
import { View } from 'react-native'
import { Button } from 'react-native-elements'

import {Music} from '../services';

function Settings() {
  return (
    <View>
      <Button
        title="Refresh songs"
        onPress={() => Music.refreshSongs()}
      />
    </View>
  );
}

export default Settings;