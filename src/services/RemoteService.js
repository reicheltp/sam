const net = require('react-native-tcp');
import PlayerService from './PlayerService'
import MusicService from "./MusicService"

const PORT = 1234;

function error(err) {
  return JSON.stringify({
    code: 1,
    err
  })
}

function success() {
  return JSON.stringify({
    code: 0,
  });
}

function isSuccess(data) {
  return data.code == 0;
}

class RemoteService {
  constructor(player: PlayerService, music: MusicService) {
    this.clients = [];

    const cmds = {
      play: (_, id) => {
        player.play(id);
      },
      pause: () => {
        player.pause();
      },
      next: () => {
        player.next();
      },
      getPlaylist: (socket) => {
        let tracks = music.tracks.snapshot();
        socket.write(JSON.stringify({
          cmd: 'tracks',
          payload: tracks
        }));
      },
    };

    let server = net.createServer(socket => {
      this.clients.push(socket);

      socket.on('data', (data) => {
        try {
          data = JSON.parse(data);
          if (data.payload) {
            cmds[data.cmd](socket, ...data.payload);
          }
          else {
            cmds[data.cmd](socket);
          }
        }
        catch (err) {
          socket.write(error(err));
        }
      });

      socket.on("error", () => {
        //let idx = this.clients.indexOf(socket);
        //this.clients.slice(idx, 1);
      });

      socket.on("close", () => {
        let idx = this.clients.indexOf(socket);
        this.clients.slice(idx, 1);
      });

    }).listen(PORT);
  }

  broadcast(payload) {
    this.clients.forEach(socket => {
      try {
        socket.write(payload);
      }
      catch (err) {
      }
    })
  }
}

RemoteService.PROTOCOL = {
  success,
  error,
  isSuccess
};

export default RemoteService;