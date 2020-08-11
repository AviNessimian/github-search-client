import { Component, OnInit } from '@angular/core';
import { SearchService } from '../core/services/SearchService';
import { FavoritesService } from '../core/services/FavoritesService';
import { RepositoryItem } from '../models/repository-item';
import { of, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { FavoriteEntity } from '../models/favorite-entity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  model: RepositoryItem;
  favoriteEntity: FavoriteEntity;
  searching: boolean;
  searchFailed: boolean;
  searchOrder: string;
  isFavorite: boolean;

  constructor(private searchService: SearchService,
    private favoritesService: FavoritesService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.model = null;
    this.favoriteEntity = null;
    this.searching = false;
    this.searchFailed = false;
    this.searchOrder = 'desc';
    this.isFavorite = null;
  }

  formatter = (result: RepositoryItem) => result.full_name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.search(term, this.searchOrder).pipe(
          tap(() => {
            this.searchFailed = false;

          }),
          catchError(() => {
            this.searchFailed = true;
            this.searching = false;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )

  orderby = () => this.searchOrder = this.searchOrder === 'desc' ? 'asc' : 'desc'

  itemSelected($event) {
    this.favoritesService.getByFullName($event.item.full_name).subscribe(favoriteEntity => {
      this.favoriteEntity = favoriteEntity;
      if (favoriteEntity.id === 0) {
        this.isFavorite = false;
      }
      else {
        this.isFavorite = true;
      }
    });

  }

  bookmark() {
    if (this.isFavorite === true) {
      this.favoritesService.delete(this.favoriteEntity.id).subscribe(x => {
        this.toastrService.success(`${this.favoriteEntity.repoFullName} successfully removed from favorites`);
        this.favoriteEntity = null;
        this.isFavorite = false;
      });
    }
    else {
      this.favoritesService.add(this.model.full_name).subscribe(favoriteEntity => {
        this.toastrService.success(`${favoriteEntity.repoFullName} successfully added to your favorites`);
        this.favoriteEntity = favoriteEntity;
        this.isFavorite = true;
      });
    }
  }
}


