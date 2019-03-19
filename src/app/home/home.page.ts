import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public posts;

  constructor(){

    this.posts = new Array(50).fill({user: 'Rafa', post: 'Esto es un twit de ejemplo', fecha: '2019', avatar: '/assets/avatar.jpg'});

  }

}
