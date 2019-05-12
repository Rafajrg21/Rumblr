import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-make-comment',
  templateUrl: './make-comment.page.html',
  styleUrls: ['./make-comment.page.scss'],
})
export class MakeCommentPage implements OnInit {

  postId = null;
  public comments = new Array;
  
  public url;
  public request;
  public token;
  public decoded;
  public comment;
  
  accessToken = this.storage.get('ACCESS_TOKEN')

  constructor(private http: HttpClient, private storage: Storage, private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.postId = this.navParams.get('post_id');

    this.url = this.http.get(`http://192.168.0.109:3000/api/posts/${this.postId}/comments`);
    this.url.subscribe((response) => {
      //console.log(response)

      response.forEach(element => {      
        this.comments 
        .push({
          id: element.id,
          user: element.User.username,
          avatar: element.User.avatar,
          comment: element.comment_text,
        });
      });
    });
    
  }

  async makeNewComment(){
    this.accessToken.then((data) => {
      this.token = data;
      this.decoded = jwt_decode(data, {complete: true});
      
      //Then we put the id as a param on the url
      this.url = `http://192.168.0.109:3000/api/posts/${this.postId}/comments`;

      return this.url, this.decoded
    })

    .then(() => {

      // We define our headers
      let headers = new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "Bearer " + this.token
      });

      const body = {
        comment_text: this.comment,
        user_id: this.decoded.id,
        post_id: this.postId
      }

      // We log to see if everything is ok
      console.log(`Calling this url ${this.url}`);

      //Finally we subscribe to the http call and we return the response 
      this.request = this.http.post(this.url, body, {headers})
      this.request.subscribe((response) => {
        console.log(response)
      });

    }) // End of .then
    .catch(error => console.log(error))
  }

  async deleteComment(id, user_id){
    
    
    this.accessToken.then((data) => {
      this.token = data;
      this.decoded = jwt_decode(data, {complete: true});
      
      //Then we put the id as a param on the url
      this.url = `http://192.168.0.109:3000/api/posts/${this.postId}/comments/${id}`;

    })

    .then(() => {

      // We define our headers
      let headers = new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "Bearer " + this.token
      });

      // We log to see if everything is ok
      console.log(`Calling this url ${this.url}`);

      //Finally we subscribe to the http call and we return the response 
      this.request = this.http.delete(this.url, {headers})
      this.request.subscribe((response) => {
        console.log(response)
      });

    }) // End of .then
    .catch(error => console.log(error))
  }

  
  
  closeModal(){
    this.modalCtrl.dismiss();
  }

}
