import { Component, OnInit, Input } from '@angular/core';
import { RepositoryItem } from '../models/repository-item';
import { FavoritesService } from '../core/services/FavoritesService';

@Component({
  selector: 'app-favorite-details-modal',
  templateUrl: './favorite-details-modal.component.html',
  styleUrls: ['./favorite-details-modal.component.scss']
})
export class FavoriteDetailsModalComponent implements OnInit {
  @Input() id: number;
  model: RepositoryItem = null;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.favoritesService.getById(this.id).subscribe(repoItem => {
      this.model = repoItem;
    });
  }

}
