
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  data: any = null;

  constructor( public http: Http) { }

  load( ) {
    return new Promise( resolve => {
      this.http.get("/assets/data/exercises.json")
        .map( res => res.json () )
        .subscribe( data => {
          this.data = data;
          resolve( this.data);
        })
    })

  }

  getExercises(){
    return this.load().then( data => {
      return data;
    })
  }

  getFilteredExercises(q){
    return this.load().then( data =>{
      let filteredExercises = [];
      for( const e of this.data ){
        if( e.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ){
          filteredExercises.push(e);
        }
      }
      return filteredExercises;
    })
  }

  getExercise(id){
    return this.load().then( data => {
      for( let i = 0; i < this.data.length; i++ ){
        if( id == this.data[i].exercise_id){
          return this.data[i];
        }
      }//end of for loop

    })// end of then
  }   




}
