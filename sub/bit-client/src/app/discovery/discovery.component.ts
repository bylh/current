import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {

  public items: Array<{id: number, src: string}> = [
    {
      id: 1,
    src: 'https://img2.woyaogexing.com/2018/08/02/19a212aa252040c686bbc808b5acc95b!600x600.jpeg'
  }, {
    id: 2,
    src: 'https://img2.woyaogexing.com/2018/08/02/e40b48e98dee4ca19a6c59e768d6408a!600x600.jpeg'
  }, {
    id: 3,
    src: 'https://img2.woyaogexing.com/2018/08/02/02ccd5d8c6dc4bddbb79d38c6d24e09e!600x600.jpeg'
  }, {
    id: 4,
    src: 'https://img2.woyaogexing.com/2018/08/02/e410bef934484f86bb9906b95123cdba!600x600.jpeg'
  }];
  public selectedId: number;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => console.log('discovery: backId', params.get('backId')))
   }

  ngOnInit() {
    console.log('disconvery init');
    this.route.paramMap.subscribe((params) => {this.selectedId = +params.get('backId'); console.log(this.selectedId); });
  }

}
