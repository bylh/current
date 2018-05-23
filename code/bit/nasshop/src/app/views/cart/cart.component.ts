
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Goods}           from '../../dataClass/defineClass';
import { GoodsService }  from '../../services/goods.service';
import { CartItem, OrdInfo, OrdGoods } from '../../dataClass/defineClass';

import { CartService }  from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { RemoteService } from '../../services/remote.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit 
{
  // For : route.params.subscribe(params => {}
  private sub: any;
  private cartItem:   CartItem;   // get from service by search ID
  private cartItems:  CartItem[];   
  private ordersArray  : OrdInfo[];
  private ordGoodsArray: OrdGoods[];


  testData : any;

  private selectedOrder: OrdInfo;

  @Input() goods: Goods;

  constructor(
      private cartService: CartService,
      private orderService: OrderService,
      private goodsService: GoodsService,
      private remoteService: RemoteService,
      private route: ActivatedRoute,
      //private routeParams: RouteParams,
      private router: Router,
      private location: Location) { }



  ngOnInit() 
  {
    // init a new item
    //this.cartItem = { id : -1, goods_id: 4, goods_name: 'iPhone 6s88', shop_price: 621.34, quantity: 2};
    this.cartItem = new CartItem( -1,  4, 'iPhone 6s88', 621.34, 2);

    console.log(this.route.params);
    
    this.sub = this.route.params.subscribe(params => {

        this.cartItem.id         = +params['goods_id'];
        this.cartItem.goods_id   = +params['goods_id']; // (+) converts string 'id' to a number
        this.cartItem.goods_name = params['goods_name'];
        this.cartItem.shop_price = +params['shop_price'];
        this.cartItem.quantity = 1;

        console.log("ID: " + this.cartItem.id);

        // For test : 
        //this.realCartItem = this.cartItem;
        //this.cartService.addItem_P(this.cartItem)
        // .then( () => this.getCartItems() )
        // .then( () => this.cartService.updateItem_O(this.realCartItem) 
        // .subscribe( () => this.getCartItems() ));

        this.findOneItemAfterGetAll(this.cartItem);

        // For get Max ID
        this.getOrder();

        // For get Max ID
        this.getOrdGoods();

        
    });
  }

  //********** In  then() ,  call a new function **********
  private findOneItemAfterGetAll(item : CartItem): Promise<CartItem | boolean> 
  {
    return this.getCartItems_P()
        .then(() => this.findItemAddOne_Memory(item))
        .then(() => null)
  }

  //*********** Add a new one or update a old one item **********
  private findItemAddOne_Memory(item : CartItem) : Observable<any> 
  {
    for(let i = 0; i<this.cartItems.length; i++ )
    {
      if( this.cartItems[i].goods_id == item.goods_id ) 
      {
        this.cartItems[i].quantity++;
        console.log("find item ID: " +  this.cartItems[i].goods_id + ", quantity++ : " +  this.cartItems[i].quantity + ", and update !");

        return this.cartService.updateItem_P(this.cartItems[i])
          .subscribe(() => this.getCartItems());
      }
    }
    console.log("new one, and add it! ID: " + item.goods_id);
    //this.cartItems.push(item);  do not need
    return this.cartService.addItem_P(this.cartItem)
      .then(() => this.getCartItems());
  }


  //*********** GET goods from the server **********
  getCartItems(): void 
  {
    this.cartService.getItems_O()
    .subscribe(goodsArray => this.cartItems = goodsArray);
  }


  private getCartItems_P(): Promise<CartItem[]> 
  {
    return this.cartService.getItems_P()
        .then(cartItems => this.cartItems = cartItems);
  }


  getCartItemByID(id: number): void 
  {
    this.cartService.getItem_O(id )
    .subscribe(good => this.cartItem = good);
  }


  // Do in Array -- useless !
  private findItemAddOne(item : CartItem) 
  {
    for(let i = 0; i<this.cartItems.length; i++ )
    {
      if( this.cartItems[i].goods_id == item.goods_id ) 
      {
        console.log("find it and account ++ ");
        this.cartItems[i].quantity ++;
        return true;
      }
    }
    console.log("new one, and add to memory array ! ");
    this.cartItems.push(item);
    return false;
  }


  // Clear remove cart and DB
  clearCart()
  {
      /*  Test
    console.log("getNebState ........ ");
    //this.goodsService.getNebState()
    this.remoteService.getNebState()
      //.subscribe(
        .then(
        data => { console.log(data); this.testData = data });
    return; // For test Api 
*/

    var item;

    // From Array to index to delete Memory items :
    while (item = this.cartItems.pop())
    {
        //this.deleteOne(item);
        this.cartService.deleteItem_O(item);
        // Why refresh by itself ?
    }
    //console.log(this.cartItems);
  }


  reloadCart()
  {
    this.getCartItems();
  }


  // delete to in-memory-data
  private deleteOne(item: CartItem): void {
    this.cartService
        .deleteItem_O(item)
        //.subscribe(() => { () => this.getCartItems() });  Effect should same with next line, but ?
        .subscribe(() => { this.cartItems = this.cartItems.filter(h => h !== item); });
  }


  goBack(): void 
  {
    this.location.back();
  }

  // Below For Order part :  ------------------------------------------

  //  For Create new order infor and order Goods items (two tables) to DB and go to order show page
  private confirmAndSaveOrder(){

    if((!this.cartItems) || (this.cartItems.length <= 0)) {
      alert(" Your cart is empty now !");
      return;
    }

    console.log("in confirmAndSaveOrder... ");

    let newGoodsID = this.getOrdGoods_NewID();
    let newOrderID = this.getOrdGoods_NewID();

    console.log("newGoodsID: " + newGoodsID);
    console.log("newOrderID: " + newOrderID);

    var total_money = 0;

    this.ordGoodsArray = [];

    for(let i=0; i<this.cartItems.length; i++) {

      total_money += (this.cartItems[i].quantity * this.cartItems[i].shop_price);

      let item1 = {
        ordgoods_id : newGoodsID++,
        ordinfo_id  : newOrderID,
        goods_id    : this.cartItems[i].goods_id,
        goods_name  : this.cartItems[i].goods_name,
        shop_price  : this.cartItems[i].shop_price,
        quantity    : this.cartItems[i].quantity
      }
      
      this.ordGoodsArray.push(item1);

      this.addOne_OrdGoodsItem(item1);

      console.log("add one new orderred goods item, ordgoods_id: " + item1.ordgoods_id);
    }

    var m = new Date();
    var dateString =
        m.getUTCFullYear() +"-"+
        ("0" + (m.getUTCMonth()+1)).slice(-2) +"-"+
        ("0" + m.getUTCDate()).slice(-2) + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2);

    this.selectedOrder = {
                ordinfo_id: newOrderID,
                ord_sn    : dateString,
                user_id   : 1,
                mobile    : "15966057988",
                money     : total_money,
                note      : "Order confirmed at "  + dateString
    };

    console.log("add one new order info item, ordinfo_id: " + this.selectedOrder.ordinfo_id);

    this.addOne_OrdInforItem(this.selectedOrder);

    // Should go to order list
    //this.router.navigate( ['order/order'] );

    // Here should clear cart items . Ready confirm order:
    this.clearCart();

  }


  private getOrdGoods_NewID() {

    //console.log(this.ordersArray);
    if( this.ordersArray.length <= 0 )
      return 1;  // first One

    this.ordersArray.sort(function(a, b){return b.ordinfo_id - a.ordinfo_id});

    return (this.ordersArray[0].ordinfo_id + 1);

  }

  // add to in-memory-data
  private addOne_OrdInforItem(item: OrdInfo): void {
    //if (!item) { return; }

    this.orderService.create_OrdInforItem(item);
  }

  // add to in-memory-data
  private addOne_OrdGoodsItem(item: OrdGoods): void {

    //if (!item) { return; }

    this.orderService.create_OrdGoodsItem(item);
  }


  private getOrder(): void 
  {
    this.orderService.getOrdInforItems()
        .subscribe(orders => this.ordersArray = orders);
  }


  private getOrdGoods(): void 
  {
    this.orderService.getOrdGoodsItems()
        .subscribe(orders => this.ordGoodsArray = orders);
  }




}



