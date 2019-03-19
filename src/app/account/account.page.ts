import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {
  
  public posts;

  constructor(){

    this.posts = new Array(25).fill({user: 'Rafa', post: 'Esto es un twit de ejemplo', fecha: '2019', avatar: '/assets/avatar.jpg'});

  }
    
}
