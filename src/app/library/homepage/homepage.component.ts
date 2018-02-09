import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../services/auth.service';
import { LibraryService } from '../../services/library.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {

  movies = new BehaviorSubject([]);
  batch = 6;
  lastKey = '';
  finished = false;
  empty:boolean = false;

  constructor(private afAuth:AngularFireAuth,
              private router:Router,
              private actRoute:ActivatedRoute,
              private auth:AuthService,
              private libraryService:LibraryService) {
      // this.movies = this.library.getAllMovies();
      this.getMovies();
  }

  ngOnInit() {
  }

  onScroll(){
    console.log("Scrolled");
    this.getMovies();
  }

  showDetails(index){
    this.router.navigate(['movie',index],{relativeTo:this.actRoute});
  }

  private getMovies(key?){
      if(this.finished) return;
      this.libraryService
          .getMovies(this.batch+1,this.lastKey).snapshotChanges()
          .map(list => {
            return list.map(data => ({key:data.key,...data.payload.val()}))
          })
          .do(movies => {
              if(movies.length != 0){
                  this.lastKey = _.last(movies).key;
                  const newMovies = _.slice(movies,0,this.batch);
                  const currentMovies = this.movies.getValue();
                  if(this.lastKey == _.last(newMovies).key){
                    this.finished = true;
                  }
                  this.movies.next(_.concat(currentMovies,newMovies));
              }else{
                this.finished = true;
                this.empty = true;
              }
          })
          .take(1)
          .subscribe()
  }

}
