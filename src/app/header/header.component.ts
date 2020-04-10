import { Component, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  fetchRecipesSbuscription: Subscription;

  constructor(private dataStorage: DataStorageService) {

  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.fetchRecipesSbuscription = this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.fetchRecipesSbuscription.unsubscribe();
  }
}
