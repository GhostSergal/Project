import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map,take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { movieInterface } from '../Model/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {


  private movies: Observable<movieInterface[]>;
  private moviesCollection: AngularFirestoreCollection<movieInterface>;

  constructor(private firestoremov: AngularFirestore) {
    this.moviesCollection=this.firestoremov.collection<movieInterface>('Movies');
    this.movies=this.moviesCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const info=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,...info};
        })
      })
    );
   }
   getMovie(id: string):Observable<movieInterface>{
     return this.moviesCollection.doc<movieInterface>(id).valueChanges().pipe(
       take(1),
       map(movie=>{
         movie.id=id;
         return movie
       })
     )
   }
   getMovieList():Observable<movieInterface[]>{
     return this.movies;
   }
   updateRating(movie: movieInterface):Promise<void>{
     return this.moviesCollection.doc(movie.id).update({ rating: movie.rating });
   }
}
