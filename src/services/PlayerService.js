/* @flow */
import * as Rx from 'rxjs';
import Sound from 'react-native-sound';
import MusicService from './MusicService'

class PlayerService {
  constructor(music: MusicService){
    this.music = music;
    this.currentTrack = { };

    this.trackChanged = new Rx.Subject();
  }

  play(trackId) {
    let track = this.music.getTrack(trackId);

    this.currentTrack = track;
    this.music.setSelected(trackId);
    this.trackChanged.next(trackId);

    let song = new Sound(track.path, '', (err) => {
      if(err){
        console.warn("error: " + err);
        return;
      }

      console.warn('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());

      if(this.currentSong){
        try{
          this.currentSong.release();
        }
        catch(err){

        }
      }

      song.play((success) => {
        if (success) {
          console.warn('successfully finished playing');
        } else {
          console.warn('playback failed due to audio decoding errors');
        }
      });

      this.currentSong = song;

    });

  }
}

export default PlayerService;