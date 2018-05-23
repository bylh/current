import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable, of } from 'rxjs';
import { Location }                 from '@angular/common';
import { OrdInfo, OrdGoods, CartItem }        from '../../dataClass/defineClass';
import { OrderService }             from '../../services/order.service';
import { CartService }              from '../../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private cartItems    : CartItem[];   
  private ordersArray  : OrdInfo[];
  private ordGoodsArray: OrdGoods[];
  private selectedOrder: OrdInfo;
  private selectedOrdGoods: Array<OrdGoods>;
  item : OrdGoods;  

  private newGoodsID : number;
  private newOrderID : number;

  private cartItem:   CartItem;   // get from service by search ID

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() 
  {
      this.cartItem = new CartItem( 10,  4, 'iPhone 6s88', 621.34, 2);

         // For test : 
        //this.realCartItem = this.cartItem;
        // this.cartService.addItem_P(this.cartItem)
        // .then( () => this.getCartItems() )
        // .then( () => this.cartService.updateItem_O(this.cartItem) 
        // .subscribe( () => this.getCartItems() ));   

        //this.getOrder_P();
        //  .then( orders => this.ordersArray = orders);

          //.then( () => this.getCartItems_P() )
          //.then( () => this.confirmAndSaveOrder()
          //.then( () => this.getOrder() )
        

    this.getOrder() 
      //.then( () => this.getOrdGoods())
    //   .then( () => this.getCartItems_P() )
    //   //.then(cartItems => this.cartItems = cartItems)
    //   .then( () => this.confirmAndSaveOrder())
    //   .then( () => this.getOrder() )
    //   .then( () => this.getOrdGoods() );

    //this.getOrder();
      // .subscribe( () => this.newOrderID = this.ordersArray.length + 1)
      // .then();

    this.getOrdGoods();
  }

  // private AddOrderAfterGetCart(): void
  // {
  //   this.getCartItems_P()
  //       .then(() => this.addNewOrder())
  //       .then(() => null)
  // }

  // private addNewOrder() : void 
  // {

  //   if( this.cartItems.length <= 0 )
  //     return;  // No goods in cart

  //   for(let i = 0; i<this.cartItems.length; i++ )
  //   {
  //       console.log("new one, and add it! ID: " + item.goods_id);
  //       //this.cartItems.push(item);  do not need
  //       return this.cartService.addItem_P(this.cartItem)
  //         .then(() => this.getCartItems());
  //   }
  // }


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


  private getOrder(): void
  {
    this.orderService.getOrdInforItems()
        .subscribe( orders => this.ordersArray = orders);
  }

  private getOrder_P(): Promise<OrdInfo[]> 
  {
    return this.orderService.getOrdInforItems_P()
        .then(orders => this.ordersArray = orders);
  }  



  private getOrdGoods(): void 
  {
    this.orderService.getOrdGoodsItems()
        .subscribe(orders => this.ordGoodsArray = orders);
  }

  private getOrdGoods_P(): Promise<OrdGoods[]> 
  {
    return this.orderService.getOrdGoodsItems_P()
        .then(orders => this.ordGoodsArray = orders);
  }



  onSelect(order: OrdInfo): void 
  {
    this.selectedOrder = order;

    this.selectedOrdGoods = this.ordGoodsArray.filter(h => h.ordinfo_id === order.ordinfo_id);

    //console.log(this.selectedOrdGoods);
  }


  goBack(): void 
  {
    this.location.back();
  }


  
    //  For Create new order infor and order Goods items (two tables) to DB and go to order show page
    private confirmAndSaveOrder() : Promise<void>  {

      if((!this.cartItems) || (this.cartItems.length <= 0)) {
        alert(" Your cart is empty now !");
        return;
      }
  
      console.log("in order confirmAndSaveOrder... ");
  
      let newGoodsID = this.getOrdGoods_NewID();
      let newOrderID = this.getOrdGoods_NewID();
  
      console.log("newGoodsID: " + newGoodsID);
      console.log("newOrderID: " + newOrderID);
  
      var total_money = 0;
  
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
        this.addOne_OrdGoodsItem(item1);
        
      }
  
      var m = new Date();
      var dateString =
          m.getUTCFullYear() +"-"+
          ("0" + (m.getUTCMonth()+1)).slice(-2) +"-"+
          ("0" + m.getUTCDate()).slice(-2) + " " +
          ("0" + m.getUTCHours()).slice(-2) + ":" +
          ("0" + m.getUTCMinutes()).slice(-2) + ":" +
          ("0" + m.getUTCSeconds()).slice(-2);
  
      let newOrdInfoitem = {
                  ordinfo_id: newOrderID,
                  ord_sn    : dateString,
                  user_id   : 1,
                  mobile    : "15966057988",
                  money     : total_money,
                  note      : "Order confirmed at "  + dateString
      };
  
      console.log("add one new order info item, ordinfo_id: " + newOrdInfoitem.ordinfo_id);
  
      this.ordersArray.push(newOrdInfoitem);

      this.addOne_OrdInforItem(newOrdInfoitem);
  
      this.clearCart();
  
    }
  
  
    private getOrdGoods_NewID() {
  
      console.log("in getOrdGoods_NewID ...." );

      if( !this.ordersArray || this.ordersArray.length <= 0 )
      {
        console.log("in getOrdGoods_NewID, no order info  ...." );
        return 1;  // first 
      }
  
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

  // Clear remove cart and DB
  clearCart()
  {
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


}

