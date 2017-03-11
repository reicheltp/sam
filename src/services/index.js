import MusicService from './MusicService';
import PlayerService from './PlayerService';
import RemoteService from "./RemoteService"

export const Music = new MusicService();
export const Player = new PlayerService(Music);
export const Remote = new RemoteService(Player, Music);