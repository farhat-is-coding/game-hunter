import { Component, Input } from '@angular/core';
import { Game } from 'src/app/model/game.model';
// import { Output, EventEmitter } from '@angular/core';
// 
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input () game!: Game;

}
