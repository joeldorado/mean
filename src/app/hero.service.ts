import { Injectable } from '@angular/core';
import { Hero }  from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpClientModule  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpModule } from '@angular/http';
@Injectable()
export class HeroService {
  private heroesUrl = 'http://localhost:3000/api/heros';  // URL to web api
  constructor(private messageService : MessageService,private http:HttpClient) { }

 /** getHeroes(): Hero[]{
    return HEROES;
  }**/
  getHeroes(): Observable<Hero[]>{
   // this.messageService.add('HeroService:fetched Heroes');
  //  return of(HEROES);
  return this.http.get<Hero[]>(this.heroesUrl)  //   (this.heroesUrl).pipe(catchError(this.handleError('getHeroes', []))
    .pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id:number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero=> hero._id === id));
  }
  
  private log(message:string){
    this.messageService.add("HeroService: "+ message);
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
} 
}
