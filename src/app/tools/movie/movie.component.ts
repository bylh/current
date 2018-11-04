import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movies: any;
  constructor(private toolsService: ToolsService) { }

  async ngOnInit() {
    try {
      this.movies = await this.toolsService.getMovies();
      
    } catch (error) {
      console.log('获取电影失败', error);
    }

  }

}
