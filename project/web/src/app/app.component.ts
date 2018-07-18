import { ServiceWorkerModule } from '@angular/service-worker';
import {BehaviorSubject} from 'rxjs';
import { Component, AfterViewInit, OnInit } from '@angular/core';
// import * as Pwa from '@angular/pwa';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'app';
  protected sw: ServiceWorkerRegistration = null;
  protected pushSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public async ngAfterViewInit() {
    // console.log('hello');
    // const interval = setInterval(async () => {
    //   if (this.sw == null) {
    //     this.sw = await navigator.serviceWorker.getRegistration('/ngsw-worker.js');
    //     console.log('this.sw123: ', this.sw);
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 2000);
  }
  public ngOnInit() {
    console.log('ngOninit');
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/ngsw-worker.js').then(reg => {
        this.sw = reg;
        // this.sw.pushManager.getSubscription()
        console.log('Service Worker and Push is supported', this.sw);
      });
    }
  }
}
