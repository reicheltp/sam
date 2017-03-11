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

  next(){
    let next = Math.floor((Math.random() * this.music.tracks.length));
    this. play(this.music.tracks[next].id);
  }

  pause(){
    if(this.currentSong) {
      this.currentSong.pause();
    }
  }

  stop(){
    if(this.currentSong){
      this.currentSong.stop();
    }
  }

  play(trackId) {
    if(!trackId){
      // continue current song
      if(this.currentSong){
        this.currentSong.play();
      }

      return;
    }

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
          this.next();
        } else {
          console.warn('playback failed due to audio decoding errors');
        }
      });

      this.currentSong = song;

    });

  }
}

export default PlayerService;