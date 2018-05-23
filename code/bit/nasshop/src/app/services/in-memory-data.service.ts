// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class InMemoryDataService {

//   constructor() { }
// }


import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    let cartItems = [
        //{ goods_id: 1, goods_name: 'iPhone 6s', shop_price: 769.99, quantity: 1},
        //{ goods_id: 2, goods_name: 'iPhone 6s Plus', shop_price: 721.34, quantity: 1},
        //{ goods_id: 3, goods_name: 'iPhone 7', shop_price: 821.34, quantity: 1},
    ];

    let ordInforItems = [
            { ordinfo_id: 1, ord_sn: '201512132345', user_id: 1, mobile: "15966057988", money: 323.49, note: '2015-12-22 10:12'},
            { ordinfo_id: 2, ord_sn: '201612132346', user_id: 2, mobile: "13905316769", money: 123.49, note: '2015-11-12 10:12'},
            { ordinfo_id: 3, ord_sn: '201412132347', user_id: 3, mobile: "13905316769", money: 423.49, note: '2015-12-02 10:12'},
            { ordinfo_id: 4, ord_sn: '201412132347', user_id: 3, mobile: "13905316769", money: 5123.49, note: '2015-12-09 10:12'},
            { ordinfo_id: 5, ord_sn: '201412132347', user_id: 4, mobile: "13905316769", money: 6123.49, note: '2015-12-12 10:12'},
            { ordinfo_id: 6, ord_sn: '201412132347', user_id: 3, mobile: "13905316769", money: 73.49,   note: '2015-03-12 10:12'},
            { ordinfo_id: 7, ord_sn: '201412132347', user_id: 5, mobile: "13905316769", money: 823.49, note: '2015-05-12 10:12'},
            { ordinfo_id: 8, ord_sn: '201412132347', user_id: 6, mobile: "13905316769", money: 123.49, note: '2015-12-12 10:12'}
        ];

    let ordGoodsItems = [
            { ordgoods_id: 1, ordinfo_id: 1, goods_id: 1, goods_name: 'iPhone 6s', shop_price: 100.49, account: 1},
            { ordgoods_id: 2, ordinfo_id: 1, goods_id: 2, goods_name: 'iPhone 6s Plus', shop_price: 123.49, account: 2},
            { ordgoods_id: 3, ordinfo_id: 1, goods_id: 3, goods_name: 'iPhone 7', shop_price: 13.49, account: 1},
            { ordgoods_id: 4, ordinfo_id: 1, goods_id: 4, goods_name: 'iPhone 7 Plus', shop_price: 23.49, account: 3},
            { ordgoods_id: 5, ordinfo_id: 2, goods_id: 4, goods_name: 'iPhone 7 Plus', shop_price: 23.49, account: 3},
            { ordgoods_id: 6, ordinfo_id: 3, goods_id: 1, goods_name: 'iPhone 6s', shop_price: 100.49, account: 1},
            { ordgoods_id: 7, ordinfo_id: 4, goods_id: 2, goods_name: 'iPhone 6s Plus', shop_price: 123.49, account: 2},
        ];

        let categraies = [
          { id: 1, cat_id: 1, parent_id: 0, cat_name: 'Smart Phone', intro: 'Smart Phone'},
          { id: 2, cat_id: 2, parent_id: 0, cat_name: 'Laptop', intro: 'Laptop'},
          { id: 3, cat_id: 3, parent_id: 0, cat_name: 'Television', intro: 'Television'},

          //{ id: 4, cat_id: 4, parent_id: 0, cat_name: 'Car', intro: 'Television'},
          //{ id: 41, cat_id: 41, parent_id: 4, cat_name: 'Ford', intro: 'LG'},

          { id: 11, cat_id: 11, parent_id: 1, cat_name: 'iPhone', intro: 'iPhone'},
          { id: 12, cat_id: 12, parent_id: 1, cat_name: 'Samsung', intro: 'Samsung'},
          { id: 13, cat_id: 13, parent_id: 1, cat_name: 'HUAWEI', intro: 'HUAWEI'},

          { id: 21, cat_id: 21, parent_id: 2, cat_name: 'Lenovo', intro: 'lenovo'},
          { id: 22, cat_id: 22, parent_id: 2, cat_name: 'Dell', intro: 'Dell'},
          { id: 23, cat_id: 23, parent_id: 2, cat_name: 'HP', intro: 'HP'},

          { id: 31, cat_id: 31, parent_id: 3, cat_name: 'Hisense', intro: 'Hisense'},
          { id: 32, cat_id: 32, parent_id: 3, cat_name: 'Samsung', intro: 'Samsung'},
          { id: 33, cat_id: 33, parent_id: 3, cat_name: 'LG', intro: 'LG'},
      ];

      let goods = [
           { id: 1, cat_id: 11, goods_id: 1, goods_sn: 'ECS000001', brand_id: 1,  goods_name: 'iPhone 6s',
           shop_price: 5.1,  market_price: 869.60, goods_quantity: 127,  sold_quantity: 6, goods_weight: 1.2,
               goods_brief: '', goods_desc:'iPhone 6s 4.7-inch display',
           thumb_img : 'assets/imgs/iphone6s-silver-select.png' ,  goods_img : 'assets/imgs/6s-1.jpeg',
           ori_img: 'assets/imgs/6s-3.jpeg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
           add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 15, 2016 11:13:00')
           },

          { id: 2, cat_id: 11, goods_id: 2, goods_sn: 'ECS000002', brand_id: 1,
              goods_name: 'iPhone 6s Plus',
              shop_price: 5.0,  market_price: 969.60, goods_quantity: 17,  sold_quantity: 6,
              goods_weight: 0.2,  goods_brief: '', goods_desc:'iPhone 6s Plus 5.5-inch display',
              thumb_img : 'assets/imgs/iphone6sp-silver-select.png' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 11, 2016 11:13:00')
          },
          
          { id: 3, cat_id: 11, goods_id: 3, goods_sn: 'ECS000003',  brand_id: 1,
              goods_name: 'iPhone 7',
              shop_price: 3.5,  market_price: 1269.60, goods_quantity: 17,  sold_quantity: 10, goods_weight: 1.2,
              goods_brief: '', goods_desc:'iPhone 7 4.7-inch display',
              thumb_img : 'assets/imgs/iphone7-select-2016.png' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 4, cat_id: 11, goods_id: 4, goods_sn: 'ECS000004',  brand_id: 1,
              goods_name: 'iPhone 7 Plus',
              shop_price: 4.8,  market_price: 1169.60, goods_quantity: 17,  sold_quantity: 3,
              goods_weight: 0.22,  goods_brief: '', goods_desc:'iPhone 7 Plus 5.5-inch display',
              thumb_img : 'assets/imgs/iphone7-plus-select-2016.png' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 5, cat_id: 11, goods_id: 5, goods_sn: 'ECS000005',  brand_id: 1,
              goods_name: 'iPhone SE',
              shop_price: 5.9,  market_price: 669.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 0.32,  goods_brief: '', goods_desc:'iPhone SE 4-inch display',
              thumb_img : 'assets/imgs/iphonese-hero-modelselect.png' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },
          { id: 6, cat_id: 12, goods_id: 6, goods_sn: 'ECS000006',  brand_id: 1,
              goods_name: 'Galaxy S7 edge',
              shop_price: 9.00,  market_price: 1069.60, goods_quantity: 17,  sold_quantity: 6,
              goods_weight: 0.12,  goods_brief: '', goods_desc:'ca-smartphones-galaxy-s7-galaxys7edge_gold',
              thumb_img : 'assets/imgs/ca-smartphones-galaxy-s7-galaxys7edge_gold.jpeg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpeg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },
          { id: 7, cat_id: 12, goods_id: 7, goods_sn: 'ECS000007',  brand_id: 1,
              goods_name: 'Galaxy S7',
              shop_price: 7.00,  market_price: 869.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 0.23,  goods_brief: '', goods_desc:'iPhone 7 Plus 5.5-inch display',
              thumb_img : 'assets/imgs/ca-smartphones-galaxy-s7-galaxys7_gold.jpeg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },
          { id: 8, cat_id: 13, goods_id: 8, goods_sn: 'ECS000008',  brand_id: 1,
              goods_name: 'HUAWEI Mate 9',
              shop_price: 8.1,  market_price: 969.60, goods_quantity: 17,  sold_quantity: 9,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'HUAWEI Mate 9 Leica dual camera, 5.9” FHD Display',
              thumb_img : 'assets/imgs/161103205719198317229Mate9_listimage1.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 9,  cat_id: 21, goods_id: 9, goods_sn: 'ECS000009',  brand_id: 1,
              goods_name: 'ThinkPad X260',  shop_price: 7.10,  market_price: 1169.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 7.2,  goods_brief: '', goods_desc:'HThinkPad X260 New: Portable, durable, and fully loaded inside a thin, light design, this 12.5" enterprise-ready powerhouse comes with an extended battery life.',
              thumb_img : 'assets/imgs/lenovo-laptop-thinkpad-x260-front-side-2.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 10, cat_id: 21, goods_id: 10, goods_sn: 'ECS000010',  brand_id: 1,
              goods_name: 'ThinkPad X1 Yoga',  shop_price:8.10,  market_price: 1969.60, goods_quantity: 17,  sold_quantity: 1,
              goods_weight: 0.12,  goods_brief: '', goods_desc:'ThinkPad X1 Yoga Ultralight 14" Business 2-in-1 The definition of versatility, this ultralight 2-in-1 adapts to your business with 4 flexible modes to work, present, create, and connect. Features a stunning display with intense color and deep contrast. Even a dockable, rechargeable stylus pen. Plus, the fastest, advanced mobile broadband technology available.',
              thumb_img : 'assets/imgs/X260-hero.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 11, cat_id: 21, goods_id: 11, goods_sn: 'ECS000011',  brand_id: 1,
              goods_name: 'ThinkPad X1 Carbon',  shop_price: 7.10,  market_price: 1869.60, goods_quantity: 17,  sold_quantity: 2,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'Ultrathin. Ultralight. Ultratough. For the average Ultrabook™ these attributes may sound like a contradiction. But the new X1 Carbon is far above average. It features a carbon-fiber reinforced chassis & passes durability tests in extreme environments. Plus, it delivers more than all-day battery life, includes faster, more powerful storage performance, & has innovative docking options available, including wireless.',
              thumb_img : 'assets/imgs/X1-Carbon-List-Image.png',  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 12, cat_id: 21, goods_id: 12, goods_sn: 'ECS000012',  brand_id: 1,
              goods_name: 'ThinkPad X260',  shop_price:1.10,  market_price: 1169.60, goods_quantity: 17,  sold_quantity: 3,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'HThinkPad X260 New: Portable, durable, and fully loaded inside a thin, light design, this 12.5" enterprise-ready powerhouse comes with an extended battery life.',
              thumb_img : 'assets/imgs/lenovo-laptop-thinkpad-x260-front-side-2.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 13, cat_id: 22, goods_id: 13, goods_sn: 'ECS000013',  brand_id: 1,
              goods_name: 'ALIENWARE 13',  shop_price: 9.99,  market_price: 1669.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'Alienware’s most powerful 13" gaming laptop. Featuring quad-core, H-class processors and NVIDIA 10-series graphics, the Alienware 13 has evolved to offer unprecedented gameplay.',
              thumb_img : 'assets/imgs/OriginalPng.png' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },
          { id: 14, cat_id: 22, goods_id: 14, goods_sn: 'ECS000014',  brand_id: 1,
              goods_name: 'AHP EliteBook Folio G1',  shop_price:1.99,  market_price: 1669.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'HP EliteBook Folio G1 - 12.5" - Core m5 6Y54 - 8 GB RAM - 256 GB SSD',
              thumb_img : 'assets/imgs/4196553.jpeg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },
          { id: 15, cat_id: 23, goods_id: 15, goods_sn: 'ECS000015',  brand_id: 1,
              goods_name: 'HP EliteBook 2570p',  shop_price:3.99,  market_price: 1769.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'HP EliteBook 2570p - 12.5" - Core i7 3520M - 4 GB RAM - 128 GB SSD',
              thumb_img : 'assets/imgs/2832948.jpeg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },


          { id: 16, cat_id: 31, goods_id: 16, goods_sn: 'ECS000016',  brand_id: 1,
              goods_name: 'Hisense H7GB 50" 4K LED Smart TV',  shop_price: 9.39,  market_price: 869.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'With a stunning Ultra High-Definition 4K resolution, the Hisense 50" LED Smart TV will make your favourite movies and TV shows look like real life. This smart TV is a certified Netflix Recommended TV and offers a modernized smart tv experience.',
              thumb_img : 'assets/imgs/10448897.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.jpg',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 17, cat_id: 32, goods_id: 17, goods_sn: 'ECS000017',  brand_id: 1,
              goods_name: 'Samsung 40"',  shop_price:799.99,  market_price: 6.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'Samsung 40" KU6270 4K UHD Television',
              thumb_img : 'assets/imgs/485572.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 18, cat_id: 33, goods_id: 18, goods_sn: 'ECS000018',  brand_id: 1,
              goods_name: 'LG 55" UH6150 4K UHD Smart',  shop_price:3.9,  market_price: 1669.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'LG 55" UH6150 4K UHD Smart LED Television',
              thumb_img : 'assets/imgs/10414409.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 19, cat_id: 32, goods_id: 19, goods_sn: 'ECS000019',  brand_id: 1,
              goods_name: 'Samsung 58" Smart Full HD LED ',  shop_price:6.99,  market_price: 1769.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'Samsung 58" Smart Full HD LED ',
              thumb_img : 'assets/imgs/485597.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 20, cat_id: 31, goods_id: 20, goods_sn: 'ECS000020',  brand_id: 1,
              goods_name: 'Sylvania 39" HD LED ',  shop_price:2.99 ,  market_price: 469.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'HP EliteBook 2570p - 12.5" - Core i7 3520M - 4 GB RAM - 128 GB SSD',
              thumb_img : 'assets/imgs/483663.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 21, cat_id: 33, goods_id: 21, goods_sn: 'ECS000021',  brand_id: 1,
              goods_name: 'LG 49" UH6100 4K UHD Smart',  shop_price:1.99,  market_price: 1169.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 1.2,  goods_brief: '', goods_desc:'LG 49" UH6100 4K UHD Smart LED TV with webOS™ 3.0',
              thumb_img : 'assets/imgs/436631.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 22, cat_id: 33, goods_id: 22, goods_sn: 'ECS000022',  brand_id: 1,
              goods_name: 'LG 55" UH7650 4K Super ',  shop_price:3.42,  market_price: 1669.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 0.26,  goods_brief: '', goods_desc:'LG 55" UH7650 4K Super UHD Television with webOS™ 3.0',
              thumb_img : 'assets/imgs/436115.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 23, cat_id: 32, goods_id: 23, goods_sn: 'ECS000023',  brand_id: 1,
              goods_name: 'Samsung 40" 1080p LED',  shop_price:3.99,  market_price: 1669.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 0.12,  goods_brief: '', goods_desc:'Samsung 40" 1080p LED Smart Hub Smart TV (UN40J5200AFXZC) Model #: UN40J5200AFXZC Web Code: 10382339',
              thumb_img : 'assets/imgs/10382339.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },

          { id: 24, cat_id: 23, goods_id: 24, goods_sn: 'ECS000024',  brand_id: 1,
              goods_name: 'HP 15.6" Touchscreen',  shop_price:5.9,  market_price: 869.60, goods_quantity: 17,  sold_quantity: 0,
              goods_weight: 0.25,  goods_brief: '', goods_desc:'HP 15.6" Touchscreen Laptop - Black (Intel Core i3-6100U/1024 GB HDD/8 GB RAM/Windows 10 Home)',
              thumb_img : 'assets/imgs/10483535.jpg' ,  goods_img : 'images/200905/goods_img/4_G_1241422402722.jpg',
              ori_img: 'images/200905/source_img/4_G_1241422402919.png',  is_on_sale: true,  is_delete: true ,  is_best:true ,  is_new:true ,  is_free_post:true,
              add_time : new Date('October 13, 2015 11:13:00'), last_update:  new Date('October 13, 2016 11:13:00')
          },
      ];

      return {heroes,
              cartItems,
              categraies,
              ordInforItems,
              ordGoodsItems,
              goods
      };
  }
}

