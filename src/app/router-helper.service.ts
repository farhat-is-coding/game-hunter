import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterHelperService {

  constructor(private router: Router) { }

  getCurrentPath(): string {
    return this.router.url;
  }
}
