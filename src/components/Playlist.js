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

class Playlist extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      tracks: ds.cloneWithRows(Music.tracks)
    };
  }

  onPress(track) {
    Player.play(track.id);
  }

  render() {
    return (
      <List containerStyle={{flex:1}}>
        <ListView
          dataSource={this.state.tracks}
          renderRow={track =>
            <TrackCell
              track={track}
              isPlaying={Player.currentTrack.id == track.id}
              onPress={() => this.onPress(track)} />
          }
        />
      </List>
    );
  }
}

export function TrackCell({track, onPress, isPlaying}) {
  return (
    <ListItem
      hideChevron
      underlayColor="#33000000"
      key={track.id}
      title={track.title}
      subtitle={track.author}
      titleStyle={isPlaying && {color: "#FF5722"}}
      avatar={track.cover}
      onPress={onPress}
    />
  );
}

export default Playlist;