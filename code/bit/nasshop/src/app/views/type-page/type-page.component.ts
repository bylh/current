import { Component, OnInit } from '@angular/core';

import { Goods, Category, MenuItem } from '../../dataClass/defineClass';
import { GoodsService } from '../../services/goods.service';
import { RemoteService } from '../../services/remote.service';

@Component({
  selector: 'app-type-page',
  templateUrl: './type-page.component.html',
  styleUrls: ['./type-page.component.css']
})
export class TypePageComponent implements OnInit {

  private goodsArray: Goods[];
  private categories: Category[];
  private menuMyItems: MenuItem[];
  private tabItems:    MenuItem[];

  private oneGoods:    Goods;
  

  constructor(private goodsService: GoodsService,
              private remoteService: RemoteService
  
  ) { }

  ngOnInit() {

    //this.getGoodsByID(3);

    this.getHeroes();
  }

  getHeroes(): void {
    this.goodsService.getGoods()
    //this.remoteService.getProducts()
    .subscribe(goodsArray => this.goodsArray = goodsArray);
    //.then(goodsArray => this.goodsArray = goodsArray)
    //.then(goodsArray => console.log(goodsArray));
  }


  getGoodsByID(id : number): void {
    this.goodsService.getGood(id)
    .subscribe(goodsArray => this.oneGoods = goodsArray);
  }



  add(name: string): void {

    name = name.trim();
    if (!name) { return; }


    // ?????
    this.goodsService.addGoods( new Goods(
      111, 11, 1, 'ECS000001', 1,  'iPhone 6s',
      69.99,  869.60, 127,  6, 1.2,
          '', 'iPhone 6s 4.7-inch display',
      './app/imgs/iphone6s-silver-select.png' ,  './app/imgs/6s-1.jpeg',
      './app/imgs/6s-3.jpeg',  true,  true ,  true ,  true , true,
      new Date('October 13, 2015 11:13:00'),  new Date('October 15, 2016 11:13:00') ) )
      .subscribe(hero => {
        this.goodsArray.push(hero);
      });
  }
 
  delete(hero: Goods): void {
    this.goodsArray = this.goodsArray.filter(h => h !== hero);
    this.goodsService.deleteGoods(hero).subscribe();
  }
}
