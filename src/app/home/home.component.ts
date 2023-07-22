import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Game } from '../model/game.model';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  popularGameData: Game[] = [];
  newGameData: Game[] = [];
  upcomingGameData: Game[] = [];
  @ViewChild('gameModal') gameModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;
  game: Game = {
    id: 0,
    name: '',
    rating: 0,
    background_image: '',
    short_screenshots: []
  }
  async ngOnInit() {
    try {
      this.getPopularGameData();
      this.getNewGameData();
      this.getUpcomingGameData();
    } catch (error) {
      console.error(error);
    }
  }

  async getPopularGameData() {
    const data: any = await this.apiService.popularGamesURL().toPromise();
    // Handle the data from the API response here
    console.log(data!['results']);
    data!['results'].forEach((game: any) => {
      let g: Game = {
        id: game['id'],
        name: game['name'],
        rating: game['rating'],
        background_image: game['background_image'],
        short_screenshots: game['short_screenshots']
      };
      this.popularGameData.push(g);
    });
  }

  async getNewGameData() {
    const data: any = await this.apiService.newGamesURL().toPromise();
    // Handle the data from the API response here
    data!['results'].forEach((game: any) => {
      let g: Game = {
        id: game['id'],
        name: game['name'],
        rating: game['rating'],
        background_image: game['background_image'],
        short_screenshots: game['short_screenshots']

      };
      this.newGameData.push(g);
    });
  }

  async getUpcomingGameData() {
    const data: any = await this.apiService.upcomingGamesURL().toPromise();
    // Handle the data from the API response here
    data!['results'].forEach((game: any) => {
      let g: Game = {
        id: game['id'],
        name: game['name'],
        rating: game['rating'],
        background_image: game['background_image'],
        short_screenshots: game['short_screenshots']

      };
      this.upcomingGameData.push(g);
    });
  }


  onGameClicked(game: Game) {
    console.log(game);
    this.game = game;

    const dialogElement = this.gameModal.nativeElement;
    dialogElement.showModal();
    
    this.formRef.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });

  }
}
