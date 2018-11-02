import { MatSnackBar } from '@angular/material';
import { DiscoveryService } from './discovery.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {

  // TODO 待完善，指定页面功能，服务端开发
  public selectedId: number;
  public segs;
  isLoaded: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private discoveryService: DiscoveryService) {
    this.route.paramMap.subscribe(params => console.log('discovery: backId', params.get('backId')))
  }

  async ngOnInit() {
    console.log('disconvery init');
    this.route.paramMap.subscribe((params) => { this.selectedId = +params.get('backId'); console.log(this.selectedId); });

    await this.getSeg();
  }

  async getSeg() {
    try {
      this.segs = await this.discoveryService.getSeg();
      console.log(this.segs);
    } catch (err) {
      console.log('getSeg(): error', err);
      this.snackBar.open('获取数据失败');
    } finally {
      this.isLoaded = true;
    }
  }

}
