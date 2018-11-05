import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movies: any;
  isLoaded: boolean = false;
  constructor(private toolsService: ToolsService, private location: Location) { }

  async ngOnInit() {
    try {
      this.movies = await this.toolsService.getMovies();
      
    } catch (error) {
      console.log('获取电影失败', error);
    } finally {
      this.isLoaded = true;
    }
  }

  back() {
    // this.router.navigate(['tabs/home']);
    this.location.back();
  }

}
