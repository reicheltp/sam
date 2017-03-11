import MusicService from './MusicService';
import PlayerService from './PlayerService';

export const Music = new MusicService();
export const Player = new PlayerService(Music);