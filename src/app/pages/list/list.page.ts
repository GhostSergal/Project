import { Component, OnInit } from '@angular/core';

import { MovieserviceService } from 'src/app/services/movieservice.service';
import { Observable } from 'rxjs';
import { movieInterface } from '../../Model/movie.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private MoviesList: Observable<movieInterface[]>;
  constructor(private movservice: MovieserviceService,) { }

  ngOnInit() {
    this.MoviesList=this.movservice.getMovieList();
    this.movservice.getMovieList().subscribe(res=>{console.log('Movies',res);});
    this.movservice.getMovieList().subscribe(console.log);
  }

}
