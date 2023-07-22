import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  search: string = '';

  constructor(private apiService: ApiService, private _route: ActivatedRoute,
    private _router: Router) {
    // apiService.searchGame
   }

  searchGame() {
    this.apiService.searchGame = this.search;
    console.log(this.apiService.searchGame);
    this._router.navigateByUrl('/search/' + this.search)

  }
}
