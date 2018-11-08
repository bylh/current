import { element } from 'protractor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('messageList') msgRef: ElementRef

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

    let div = this.render.createElement('div');

    this.render.addClass(div, data.type === 0 ? 'msg-info-me' : 'msg-info-other');

    let dt = this.render.createElement('dt');
    this.render.addClass(dt, 'nick-name');
    dt.innerHTML = data.username;
    this.render.appendChild(div, dt);

    let dtt = this.render.createElement('dt');
    dtt.innerHTML = data.text;
    this.render.addClass(dtt, 'text');
    this.render.appendChild(div, dtt);

    this.render.appendChild(this.msgRef.nativeElement, div);



  }

  /*展示通知*/
  showNotice(data) {
    let p = this.render.createElement('p');
    p.innerHTML = data.text;
    this.render.addClass(p, 'notice');
    this.render.appendChild(this.msgRef.nativeElement, p);
  }

  cancel(): void {
    // this.overlayRef.dispose();
  }
}
