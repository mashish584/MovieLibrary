import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { LibraryService } from './../../services/library.service';
import { Movie } from './../../models/movie.model';
import { validateDate } from '../validators/movie-validators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  error:any;
  movieForm:FormGroup;
  id:any;
  movie:Movie;
  editMode:boolean = false;

  constructor(private authService:AuthService,
              private router:Router,
              private libraryService:LibraryService,
              private actRoute:ActivatedRoute) {
  }

  ngOnInit() {
    //setting defaulf form data
    this.editMode = false;
    this.movie = new Movie(null,null,null,null,null,null);
    //construct form
    this.constructForm();
    //check for param in route
    this.actRoute.params.subscribe((data) => {
      if(data.id){
        this.editMode = true;
        this.libraryService.getMovie(data.id)
            .subscribe((content) => {
                this.id = content.key;
                this.movie = {...content.payload.val()};
                this.constructForm();
            })
      }
    });

  }


  constructForm(){
     let date = ["","",""],
         actors = [new FormControl(null,Validators.required)],
         producers = [new FormControl(null,Validators.required)];

    //get dd/mm/yyyy from year
    if(this.editMode){
      date = this.movie.year.split('/');
      producers = [];
      actors = [];
      this.movie.producers.map(producer => {
        producers.push(new FormControl(producer,Validators.required));
      });
      this.movie.actors.map(actor => {
        actors.push(new FormControl(actor,Validators.required));
      });
    }
    //Initializing movie form in component
    this.movieForm = new FormGroup({
      'title' : new FormControl(this.movie.title,Validators.required),
      'description' : new FormControl(this.movie.description,[
                        Validators.required,
                        Validators.minLength(275)]),
      'date' : new FormControl(date[0],[
                                      Validators.required,
                                      Validators.pattern('^[0-9]+$'),
                                      Validators.maxLength(2),
                                      validateDate("date")
                                    ]),
      'month' : new FormControl(date[1],[
                                      Validators.required,
                                      Validators.maxLength(2),
                                      Validators.pattern('^[0-9]+$'),
                                      validateDate("month")
                                    ]),
      'year' : new FormControl(date[2],[
                                      Validators.required,
                                      Validators.minLength(4),
                                      Validators.maxLength(4),
                                      Validators.pattern('^[1-2][0-9]+$'),
                                      validateDate("year")
                                    ]),
      'director' : new FormControl(this.movie.director,Validators.required),
      'producers' : new FormArray(producers),
      'actors' : new FormArray(actors),
    });
  }

  addField(type){
    const control = new FormControl(null,Validators.required);
    if(type == "prod"){
      (<FormArray> this.movieForm.get('producers')).push(control);
    }
    if(type == "act"){
      (<FormArray> this.movieForm.get('actors')).push(control);
    }

  }

  addMovie(){
     this.error = "";
     const form = this.movieForm;
     const[date,month,year] = [form.get('date').value,
                               form.get('month').value,
                               form.get('year').value];
     this.movie = new Movie(
                      form.get('title').value,
                      form.get('description').value,
                      form.get('actors').value,
                      form.get('director').value,
                      form.get('producers').value,
                      `${date}/${month}/${year}`);

   if(!this.editMode){
       this.libraryService
        .saveMovie(this.movie)
        .subscribe((result:boolean) => {
            if(!result){
              this.router.navigate(['/library']);
            }else{
              this.error = "Movie already in library.";
            }
        });
   }else{
      this.libraryService
          .updateMovie(this.movie,this.id)
          .subscribe((result:boolean) => {
              if(!result){
                this.router.navigate(['/library']);
              }else{
                this.error = "Movie already in library.";
              }
          });
   }

  }

}
