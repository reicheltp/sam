import Realm from 'realm'
import MusicFiles from 'react-native-get-music-files';

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
  },
};

export const PlaylistSchema = {
  name: 'Playlist',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: {type: 'string', indexed: true},
    tracks: {type: 'list', objectType: TrackSchema.name },
  }
};

class MusicService {
  constructor() {
    this.realm = new Realm({
      schema: [TrackSchema, PlaylistSchema],
    });
  }

  refreshSongs() {
    MusicFiles.get(
      (success) => {
        this.realm.write(() => {
          this.realm.create(TrackSchema.name, success);
        });
      },
      (error) => {

      }
    );
  }
}

export default MusicService;