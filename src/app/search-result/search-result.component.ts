import { Component, OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import { ApiService } from '../api.service';
import { Game } from '../model/game.model';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterHelperService } from '../router-helper.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  currentPath!: string;
  @ViewChild('gameModal') gameModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

  constructor(private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private routerHelper: RouterHelperService) { 
      this.currentPath = this.routerHelper.getCurrentPath();

      this.routerSubscription = this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentPath = this.routerHelper.getCurrentPath();
          console.log(this.currentPath);
          const id = this.route.snapshot.paramMap.get('id') || '';
          console.log(id);
          this.apiService.searchGame = id!;
          this.getSearchedGame();

        }
      });
    }
  games: Game[] = [];
  private routerSubscription!: Subscription;

  game: Game = {
    id: 0,
    name: '',
    rating: 0,
    background_image: '',
    short_screenshots: []
  }


  async getSearchedGame(){
    this.games =[]
    const data: any = await this.apiService.searchGameURL().toPromise();
    console.log(data);

    data['results'].forEach((game: any) => {
      let g: Game = {
        id: game['id'],
        name: game['name'],
        rating: game['rating'],
        background_image: game['background_image'],
        short_screenshots: game['short_screenshots']
      };
      this.games.push(g);
    });

  }

  
  onGameClicked(game: Game) {
    this.game = game;

    const dialogElement = this.gameModal.nativeElement;
    dialogElement.showModal();
    
    this.formRef.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });

  }


  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
