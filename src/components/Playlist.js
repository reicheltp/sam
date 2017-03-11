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
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      tracks: this.ds.cloneWithRows(Music.tracks)
    };
  }

  componentDidMount(){
    this.trackSub = Player.trackChanged.subscribe(id => {
       this.setState({tracks: this.ds.cloneWithRows(Music.tracks)})
    });
  }

  componentWillUnmount(){
    if(this.trackSub){
      this.trackSub.unsubscribe();
    }
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
              isPlaying={track.isSelected}
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