import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  //API Key
  api_key = '21ebf7d2394e49ca99f4eb59fa76938d'
  //base URL
  base_url = "https://api.rawg.io/api"

  year: string | number = ''
  month: string | number = ''
  day: string | number = ''

  CurrentYear = ''
  LastYear = ''
  NextYear = ''

  popular_games = ''
  upcoming_games = ''
  new_games = ''

  constructor(private http: HttpClient) { 
    this.year = this.getYear()
    this.month = this.getMonth()
    this.day = this.getDay()

    this.CurrentYear = `${this.year}-${this.month}-${this.day}`
    this.LastYear = `${this.year - 1}-${this.month}-${this.day}`
    this.NextYear = `${this.year + 1}-${this.month}-${this.day}`


    this.popular_games = `/games?dates=${this.LastYear},${this.CurrentYear}&ordering=-rating&page_size=10`
    this.upcoming_games = `/games?dates=${this.CurrentYear},${this.NextYear}&ordering=-added&page_size=10`
    this.new_games = `/games?dates=${this.LastYear},${this.CurrentYear}&ordering=-released&page_size=10`
  }

  ngOnInit(): void {
    // this.year = this.getYear()
    // this.month = this.getMonth()
    // this.day = this.getDay()

    // this.CurrentYear = `${this.year}-${this.month}-${this.day}`
    // this.LastYear = `${this.year - 1}-${this.month}-${this.day}`
    // this.NextYear = `${this.year + 1}-${this.month}-${this.day}`


    // this.popular_games = `/games?dates=${this.LastYear},${this.CurrentYear}&ordering=-rating&page_size=10`
    // this.upcoming_games = `/games?dates=${this.CurrentYear},${this.NextYear}&ordering=-added&page_size=10`
    // this.new_games = `/games?dates=${this.LastYear},${this.CurrentYear}&ordering=-released&page_size=10`
  }
  popularGamesURL(){
    console.log(this.base_url + this.popular_games + '&key=' + this.api_key);
    
    return this.http.get(`${this.base_url}${this.popular_games}&key=${this.api_key}`)
  }

  // popularGamesURL = () => this.http.get(`${this.base_url}${this.popular_games}&key=${this.api_key}`)
  upcomingGamesURL = () => this.http.get(`${this.base_url}${this.upcoming_games}&key=${this.api_key}`)
  newGamesURL = () => this.http.get(`${this.base_url}${this.new_games}&key=${this.api_key}`)

  getMonth = () => {
    const month = new Date().getMonth() + 1
    if (month < 10) {
      return `0${month}`
    }
    else {
      return month
    }
  }
  getDay = () => {
    const day = new Date().getDate()
    if (day < 10) {
      return `0${day}`
    }
    else {
      return day
    }
  }
  getYear = () => {
    return new Date().getFullYear()
  }

}
