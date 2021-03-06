import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireList } from 'angularfire2/database';
import { Movie } from './../models/movie.model';
import { error } from 'util';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LibraryService{

    // crating subject property
    updateData = new Subject<any>();

    constructor(private db:AngularFireDatabase){}

    //Subject Method for data change notification
    //in component
    updateSubject(){
        console.log("Call to Update Subject");
        this.updateData.next("WOW IT WORKS");
    }

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
                   .map(data => {
                        let error;
                        if(data.length == 0){
                            //push movie if there is no movie in db
                            this.getAllMovies().push(movie);
                            error = false;
                        }else{
                           data.map((item) => {
                               //check for exist title if there is movies in db
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
                    .map(movies => {
                        let error;
                        movies.forEach(data => {
                            let item = {...data.payload.val()};
                            //check if movie name is unique
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

    // Delete movie
    deleteMovie(id){
        this.getAllMovies().remove(id);
    }


}