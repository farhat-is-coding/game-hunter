import { Component, OnInit } from '@angular/core';
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
    const data:any = await this.apiService.popularGamesURL().toPromise();
    // Handle the data from the API response here
    console.log(data!['results']);
    data!['results'].forEach((game: any) => {
      let g: Game ={
        id: game['id'],
        name: game['name'],
        rating: game['rating'],
        background_image: game['background_image']
      };
      this.popularGameData.push(g);
    });
  }

  async getNewGameData() {
    const data:any = await this.apiService.newGamesURL().toPromise();
    // Handle the data from the API response here
    data!['results'].forEach((game: any) => {
      let g: Game ={
        id: game['id'],
        name: game['name'],
        rating: game['rating'],
        background_image: game['background_image']
      };
      this.newGameData.push(g);
    });
  }

  async getUpcomingGameData() {
    const data:any = await this.apiService.upcomingGamesURL().toPromise();
    // Handle the data from the API response here
    data!['results'].forEach((game: any) => {
      let g: Game ={
        id: game['id'],
        name: game['name'],
        rating: game['rating'],
        background_image: game['background_image']
      };
      this.upcomingGameData.push(g);
    });
  }

}
