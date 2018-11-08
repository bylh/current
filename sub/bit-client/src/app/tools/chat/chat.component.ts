
import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    // private overlayRef: OverlayRef,
  ) { }

  ngOnInit() {
    let roomid = '100';
    let userInfo = {
      username: 'bylh'
    }
    if (roomid != null && roomid != '') {
      const socket = io.connect('http://127.0.0.1:5001?roomid=' + roomid);
      /*连接完毕，马上发送一个'join'事件，把自己的用户名告诉别人*/
      socket.emit('join', {
        username: userInfo.username
      });

      socket.on('message', function (msg) {
        switch (msg.event) {
          case 'join':
            if (msg.data.username) {
              console.log(msg.data.username + '加入了聊天室');
              let data = {
                text: msg.data.username + '加入了聊天室'
              };
              // showNotice(data);
            }
            break;
          case 'broadcast_say':
            if (msg.data.username !== userInfo.username) {
              console.log(msg.data.username + '说: ' + msg.data.text);
              // showMessage(msg.data);
            }
            break;
          case 'broadcast_quit':
            if (msg.data.username) {
              console.log(msg.data.username + '离开了聊天室');
              let data = {
                text: msg.data.username + '离开了聊天室'
              };
              // showNotice(data);
            }
            break;
        }
      })

    }
  }

  cancel(): void {
    // this.overlayRef.dispose();
  }
}
