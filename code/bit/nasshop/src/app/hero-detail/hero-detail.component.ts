
// import { Hero } from '../hero';
// import { Component, OnInit, Input } from '@angular/core';


// import { ActivatedRoute } from '@angular/router';
// /*
// The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent. 
// This component is interested in the route's bag of parameters extracted from the URL. 
// The "id" parameter is the id of the hero to display.
// */

// import { Location } from '@angular/common';
// import { HeroService }  from '../hero.service';

// @Component({
//   selector: 'app-hero-detail',
//   templateUrl: './hero-detail.component.html',
//   styleUrls: ['./hero-detail.component.css']
// })
// export class HeroDetailComponent implements OnInit {

//   @Input() hero: Hero;  // transfer from parent compoment ...

//   constructor(
//     private route: ActivatedRoute,
//     private heroService: HeroService,
//     private location: Location) { }

//   ngOnInit() {
//     this.getHero();
//   }


//   goBack(): void {
//     this.location.back();
//   }

//   getHero(): void {
    
//     // parameter ID ............................................
//     const id = +this.route.snapshot.paramMap.get('id');


//     this.heroService.getHero(id)
//       .subscribe(hero => this.hero = hero);
//   }

// }


import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
 
import { Hero }         from '../dataClass/hero';
import { HeroService }  from '../services/hero.service';
 
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
 
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
 
  ngOnInit(): void {
    this.getHero();
  }
 
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
 
  goBack(): void {
    this.location.back();
  }
 
 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}