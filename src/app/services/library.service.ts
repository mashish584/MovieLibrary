import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireList } from 'angularfire2/database';
import { Movie } from './../models/movie.model';
import { error } from 'util';


@Injectable()
export class LibraryService{

    constructor(private db:AngularFireDatabase){}

    //get all movies
    getAllMovies(){
        return this.db.list<Movie>('movies');
    }

    //get movies with a batch
    //and start list from last key
    getMovies(batch,lastKey?){

        return this.db.list<Movie>('movies',(ref) => {
            if(!lastKey){
                return  ref.orderByKey().limitToFirst(batch);
            }

            return  ref.orderByKey().limitToFirst(batch).startAt(lastKey);

        });

    }

    //get single movie from a list of movie by matching it with key
    getMovie(key){
        return this.getAllMovies().snapshotChanges()
                    .map((data) => {
                        return data.filter((movie) => {
                            if(movie.key == key){
                                return movie;
                            }
                        })[0]
                    })
    }

    //save movie in firebase
    saveMovie(movie){
        return this.getAllMovies().valueChanges()
                   .take(1)
                   .map(data => {
                        let error;
                        if(data.length == 0){
                            //push movie if there is no data
                            this.getAllMovies().push(movie);
                            error = false;
                        }else{
                           data.map((item) => {
                               //check for exist title
                               if(item.title.toLowerCase() == movie.title.toLowerCase()){
                                    error = true;
                               }
                           })

                           if(!error){
                               //push movie if there is no error
                                this.getAllMovies().push(movie);
                            }
                        }

                        return error;
                   })
    }

    //update movie with proper validation
    updateMovie(movie,key){
        return this.getAllMovies().snapshotChanges()
                    .take(1)
                    .map(movies => {
                        let error;
                        movies.forEach(data => {
                            let item = {...data.payload.val()};
                            if(item.title.toLowerCase() == movie.title.toLowerCase() && data.key !== key){
                                error = true;
                            }else{
                               if(!error){
                                    this.getAllMovies().update(key,movie);
                                    error = false;
                               }
                            }
                        });
                        return error;
                    })
    }

}