/* @flow */

import Realm from 'realm'
import MusicFiles from 'react-native-get-music-files';
import {PermissionsAndroid} from 'react-native';

export const TrackSchema = {
  name: 'Track',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: {type: 'string', optional: true, indexed: true},
    author: {type: 'string', optional: true, indexed: true},
    album: {type: 'string', optional: true},
    genre: {type: 'string', optional: true},
    duration: 'int',
    cover: {type: 'string', optional: true},
    blur: {type: 'string', optional: true},
    path: 'string',
    isSelected: {type: 'bool', default: false},
  },
};

export const PlaylistSchema = {
  name: 'Playlist',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: {type: 'string', indexed: true},
    tracks: {type: 'list', objectType: TrackSchema.name},
  }
};

class MusicService {
  constructor() {
    this.realm = new Realm({
      schema: [TrackSchema, PlaylistSchema],
    });

    this.tracks = this.realm.objects(TrackSchema.name);
  }

  getTrack(trackId) {
    return this.realm.objectForPrimaryKey(TrackSchema.name, trackId);
  }

  setSelected(trackId){
    this.realm.write(() => {
      this.tracks.forEach(val => {
        val.isSelected = val.id == trackId;
      });
    });
  }

  async refreshSongs() {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
          'title': 'Search for Music on Device',
          'message': 'Let Sam search for Music on your device.'
        });

      if (granted != PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('error');
      }

      MusicFiles.get(
        (success) => {
          console.warn(`found ${success.length}`);

          console.log("tracks: " + JSON.stringify( success));

          this.realm.write(() => {
            success.forEach(track => {
              track.id = Number(track.id);
              track.duration = Number(track.duration);
              this.realm.create(TrackSchema.name, track);
            });
          });
        },
        (error) => {
          console.warn(`found no ${error}`);

        }
      );
    }
    catch (err) {
      console.warn(err);
    }
  }
}

export default MusicService;