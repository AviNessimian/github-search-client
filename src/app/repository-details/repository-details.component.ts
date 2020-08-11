import { Component, OnInit, Input } from '@angular/core';
import { RepositoryItem } from '../models/repository-item';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit {
  @Input() model: RepositoryItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
