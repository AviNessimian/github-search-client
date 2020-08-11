import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { RepositoryItem } from 'src/app/models/repository-item';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';


@Injectable()
export class SearchService {
    constructor(private http: HttpClient) { }

    search(term: string, order: string,): Observable<RepositoryItem[]> {
        if (term.length < 2) {
            return of([]);
        }

        var params = new HttpParams({
            fromObject: {
                name: term,
                order: order,
                page: '1',
                showEntries: '10'
            }
        });

        return this.http.get<RepositoryItem[]>(environment.apiSearchUrl, { params: params });
    }
}