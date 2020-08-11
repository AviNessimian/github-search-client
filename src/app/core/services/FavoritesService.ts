import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { RepositoryItem } from 'src/app/models/repository-item';
import { FavoriteEntity } from 'src/app/models/favorite-entity';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class FavoritesService {
    constructor(private http: HttpClient) { }

    get(): Observable<FavoriteEntity[]> {
        return this.http.get<FavoriteEntity[]>(environment.apiFavoritesUrl);
    }

    getById(id: number): Observable<RepositoryItem> {
        return this.http.get<RepositoryItem>(`${environment.apiFavoritesUrl}/${id.toString()}`)
            .pipe(
                tap(_ => console.log(`fetched repository item id=${id}`))
            );
    }

    getByFullName(fullName: string): Observable<FavoriteEntity> {
        return this.http.get<FavoriteEntity>(`${environment.apiFavoritesUrl}/isfavorite/${encodeURIComponent(fullName)}`);
    }

    add(fullName: string): Observable<FavoriteEntity> {
        return this.http.post<FavoriteEntity>(environment.apiFavoritesUrl, { fullName: fullName });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<any>(`${environment.apiFavoritesUrl}/${id.toString()}`);
    }
}