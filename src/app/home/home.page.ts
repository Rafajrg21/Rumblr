import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public posts = new Array;
  public url;

  constructor(private http: HttpClient){

    this.url = this.http.get('http://localhost:3000/api/posts');
    this.url.subscribe((response) => {
      //console.log(response)

      response.forEach(element => {
        let date = element.createdAt.toDateString;
        this.posts 
        .push({
          post_text: element.post_text, 
          post_image: element.post_image, 
          date: date, 
          user: element.User.username, 
          avatar: element.User.avatar
        });
      });
    });
    
  }

}
