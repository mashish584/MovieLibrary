import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';


@Component({
  selector: 'app-single-movie',
  templateUrl: 'single-movie.component.html',
  styleUrls: ['single-movie.component.css']
})

export class SingleMovieComponent implements OnInit{

  id;
  movie;
  title;
  description;
  constructor(private router:Router,
              private actRoute:ActivatedRoute,
              private library:LibraryService ){}

  ngOnInit(){
      this.actRoute.params
          .subscribe((data) =>{
              this.id = data.id;
              this.library.getMovie(this.id)
                  .subscribe((movie) => {
                      this.movie = {key:movie.key,...movie.payload.val()};
                      this.title = this.movie.title;
                      this.description  = this.movie.description;
                  });
          })
  }

  closeRoute(){
    this.router.navigateByUrl('library');
  }

  editMode(){
    this.router.navigate(['/movie/edit',this.id]);
  }

}