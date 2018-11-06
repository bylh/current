import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  orgMovies: any;
  movies: any;
  isLoaded: boolean = false;
  isSearchMode = false;
  searchKey: string;
  constructor(private toolsService: ToolsService, private location: Location) { }

  async ngOnInit() {
    try {
      this.orgMovies = this.movies = await this.toolsService.getMovies();
      
    } catch (error) {
      console.log('获取电影失败', error);
    } finally {
      this.isLoaded = true;
    }
  }

  search(key: string) {
    console.log(event);
    this.movies = this.orgMovies.filter((item) => item.title.indexOf(key) !== -1 || item.year.indexOf(key) !== -1);

  }

  openSearch() {
    this.isSearchMode = true;
    this.search(this.searchKey);
  }
  closeSearch() {
    this.isSearchMode = false;
    this.movies = this.orgMovies;
  }
  back() {
    // this.router.navigate(['tabs/home']);
    this.location.back();
  }

}
