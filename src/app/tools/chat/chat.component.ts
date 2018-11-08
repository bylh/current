import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  socket: io;
  inputMessage: string;
  roomid = '100';
  userInfo = {
    username: 'bylh' + Math.round(Math.random() * 1000)
  }
  constructor(
    private render: Renderer2,
    public dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    if (this.roomid != null && this.roomid != '') {
      this.socket = io.connect('http://127.0.0.1:5001?roomid=' + this.roomid);
      /*连接完毕，马上发送一个'join'事件，把自己的用户名告诉别人*/
      this.socket.emit('join', {
        username: this.userInfo.username
      });

      this.socket.on('message', (msg) => {
        switch (msg.event) {
          case 'join':
            if (msg.data.username) {
              console.log(msg.data.username + '加入了聊天室');
              let data = {
                text: msg.data.username + '加入了聊天室'
              };
              this.showNotice(data);
            }
            break;
          case 'broadcast_say':
            if (msg.data.username !== this.userInfo.username) {
              console.log(msg.data.username + '说: ' + msg.data.text);
              this.showMessage(msg.data);
            }
            break;
          case 'broadcast_quit':
            if (msg.data.username) {
              console.log(msg.data.username + '离开了聊天室');
              let data = {
                text: msg.data.username + '离开了聊天室'
              };
              this.showNotice(data);
            }
            break;
        }
      })

    }
  }

  sendMessage() {
    /*点击发送按钮*/

    /*向服务器提交一个say事件，发送消息*/
    let data = {
      text: this.inputMessage,
      type: 0,
      username: this.userInfo.username
    };
    console.log('发送消息', data);
    this.socket.emit('say', data);
    this.inputMessage = '';
    // this.render.appendChild()
    this.showMessage(data);
  }

  /*展示消息*/
  showMessage(data) {
    var itemArr = [];
    itemArr.push('<dd class="' + (data.type === 0 ? "me" : "other") + '">');
    itemArr.push('<ul>');
    itemArr.push('<li class="nick-name">' + data.username + '</li>');
    itemArr.push('<li class="detail">');
    itemArr.push('<div class="head-icon"></div>');
    itemArr.push('<div class="text">' + data.text + '</div>');
    itemArr.push('</li>');
    itemArr.push('</ul>');
    itemArr.push('</dd>');

    document.getElementById('list').innerHTML += itemArr.join('');
  }

  /*展示通知*/
  showNotice(data) {
    let item = '<dd class="tc"><span>' + data.text + '</span><dd>';
    document.getElementById('list').innerHTML += item;
  }

  cancel(): void {
    // this.overlayRef.dispose();
  }
}
