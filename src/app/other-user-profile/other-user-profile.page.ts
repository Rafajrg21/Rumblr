import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.page.html',
  styleUrls: ['./other-user-profile.page.scss'],
})
export class OtherUserProfilePage implements OnInit {

  public users = new Array;
  public posts = new Array;

  passedId = null;

  public url;
  public request;
  public postsUrl;
  public postsRequest;
  public decoded;
  public token;

  accessToken = this.storage.get('ACCESS_TOKEN')

  constructor(private http: HttpClient, private storage: Storage, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.passedId = this.activatedRoute.snapshot.paramMap.get('id');

    this.accessToken.then((data) => {
      //First we get the token from the accessToken
      this.token = data;
      //Then we decode it with jwt_decode to access the id of the token passed
      this.decoded = jwt_decode(data, {complete: true});
      
      //Then we put the id as a param on the url
      this.postsUrl = `http://192.168.0.109:3000/api/posts/${this.passedId}`;
      this.url = `http://192.168.0.109:3000/api/profile/${this.passedId}`;

      return this.url, this.decoded
    })

    .then(() => {
      
      // We define our headers
      let headers = new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "Bearer " + this.token
      });

      // We log to see if everything is ok
      console.log(`Calling this url ${this.url} and this url ${this.postsUrl}`);

      this.postsRequest = this.http.get(this.postsUrl, {headers})
      this.postsRequest.subscribe((posts) => {
        console.log(posts)
        posts.forEach(element => {
          if(posts[0].user_id == this.passedId){
            this.posts 
            .push({
              post_text: element.post_text, 
              post_image: element.post_image, 
            });
          }
        });
        this.postsRequest 
      });

      this.request = this.http.get(this.url, {headers})
      this.request.subscribe((data) => {
        console.log(data)
       
          this.users 
          .push({
            id: data.id,
            user: data.username,
            email: data.email, 
            bio: data.bio,
            avatar: data.avatar
          });
        
      });
      return this.request
    })
    .catch(error => console.log(error))

  } // End of function

}
