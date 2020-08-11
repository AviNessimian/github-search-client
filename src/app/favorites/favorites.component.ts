import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../core/services/FavoritesService';
import { FavoriteEntity } from '../models/favorite-entity';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteDetailsModalComponent } from '../favorite-details-modal/favorite-details-modal.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteEntity[];

  constructor(private favoritesService: FavoritesService,
    private toastrService: ToastrService,
    private modalSrc: NgbModal) { }

  ngOnInit(): void {

    this.favoritesService.get().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  remove(favoriteEntity: FavoriteEntity) {
    this.favoritesService.delete(favoriteEntity.id).subscribe(x => {
      const index: number = this.favorites.indexOf(favoriteEntity);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
      this.toastrService.success(`${favoriteEntity.repoFullName} successfully removed from favorites`);
    });
  }

  openDetailsModal(id: number) {
    const modalRef = this.modalSrc.open(FavoriteDetailsModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
  }

}
