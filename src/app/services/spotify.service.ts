import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('Spotify service listo');
   }

   getQuery( query: string ) {
     const url = `https://api.spotify.com/v1/${ query }`;
     const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
      'Authorization': 'Bearer BQDXFaVHUk9fEoRst2C3sblRaI61nk1-tFhRtIW0nemZb49Ip4w26G12bNGu2Ad2qFv5HxozBw_pNX-ag8Z9uD5OGzSvuxfNi8CeVUWt8w2TVU1EjsDfyXCIXl9Cm-9K6dKbBluOwA'
    });

    return this.http.get( url, { headers });
   }

   getNewReleases() {
     return  this.getQuery('browse/new-releases?limit=20')
                 .pipe( map( data => data['albums'].items ));
   }

   getArtistas( termino: string ) {
     return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe( map (data => data['artists'].items ));
   }

   getArtista( id: string ) {
    return this.getQuery(`artists/${ id }`);
            // .pipe( map (data => data['artists'].items ));
   }

   getTopTracks( id: string ) {
   return this.getQuery(`artists/${ id }/top-tracks?country=ES`)
            .pipe( map (data => data['tracks'] ));
   }

}
