import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {
  
  public posts = new Array;
  public users = new Array;
  public user = new Array;

  accessToken = this.storage.get('ACCESS_TOKEN')
  
  public decoded;
  public token;
  public postUrl;
  public userUrl;
  public url;
  public postRequest;
  public userRequest;
  
  constructor(private http: HttpClient, private storage: Storage, private popoverCtrl: PopoverController){ }
    
  ngOnInit() {

    this.accessToken.then((data) => {
      //First we get the token from the accessToken
      console.log(`This is the token we are getting ${data}`);
      this.token = data;

      //Then we decode it with jwt_decode to access the id of the token passed
      this.decoded = jwt_decode(data, {complete: true});
      console.log(`And this is the information we are getting ${this.decoded.id}`);
      
      //Then we put the id as a param on the url
      this.postUrl = `http://192.168.0.109:3000/api/posts/${this.decoded.id}`;
      this.userUrl = `http://192.168.0.109:3000/api/profile/${this.decoded.id}`;

      return this.postUrl, this.userUrl, this.decoded
    })

    .then(() => {
      
      // We define our headers
      let headers = new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "Bearer " + this.token
      });

      // We log to see if everything is ok
      console.log(`Calling this url ${this.postUrl} and this url ${this.userUrl}`);

      //Finally we subscribe to the http call and we return the response 
      this.postRequest = this.http.get(this.postUrl, {headers})
      this.postRequest.subscribe((posts) => {
        console.log(posts)
        posts.forEach(element => {
          if(posts[0].user_id == this.decoded.id){
            this.posts 
            .push({
              post_text: element.post_text, 
              post_image: element.post_image, 
            });
          }
        });
        this.postRequest 
      });

      this.userRequest = this.http.get(this.userUrl, {headers})
      this.userRequest.subscribe((data) => {
        console.log(data)
        if(data.id == this.decoded.id){
          this.users 
          .push({
            id: data.id,
            user: data.username,
            email: data.email, 
            bio: data.bio,
            avatar: data.avatar
          });
        }
      });
      return this.userRequest
    }) // End of .then
    .catch(error => console.log(error))

  } // End of function

  async showPop(id){

  const popover = await this.popoverCtrl.create({
    component: EditProfilePage,
    componentProps:{
      user_id: id,
    }
  });
  popover.present();  

  }

} // End of class
