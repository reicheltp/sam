/* @flow */
import * as Rx from 'rxjs';
import Sound from 'react-native-sound';
import MusicService from './MusicService'

class PlayerService {
  constructor(music: MusicService){
    this.music = music;

    let track = this.music.tracks.filtered("isSelected == true").slice(0,1);

    this.currentTrack = track ? track : { };

    this.trackChanged = new Rx.Subject();
    this.isPlaying = new Rx.BehaviorSubject(false);
  }

  next(){
    let next = Math.floor((Math.random() * this.music.tracks.length));
    this. play(this.music.tracks[next].id);
  }

  pause(){
    if(this.currentSong) {
      this.currentSong.pause();
      this.isPlaying.next(false);
    }
  }

  stop(){
    if(this.currentSong){
      this.currentSong.stop();
      this.isPlaying.next(false);
    }
  }

  play(trackId) {
    if(!trackId){
      // continue current song
      if(this.currentSong){
        this.currentSong.play();
        this.isPlaying.next(true);
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
      this.isPlaying.next(true);
    });
  }
}

export default PlayerService;