/* @flow */
import * as Rx from 'rxjs';

import MusicService from './MusicService'

class PlayerService {
  constructor(music: MusicService){
    this.music = music;
    this.currentTrack = { };
  }

  play(trackId){
    console.warn("play " + trackId);
    this.currentTrack = this.music.getTrack(trackId);
  }
}

export default PlayerService;