import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.page.html',
  styleUrls: ['./make-post.page.scss'],
})
export class MakePostPage implements OnInit {

  public url;
  public request;
  public token;
  public decoded;
  public text;
  accessToken = this.storage.get('ACCESS_TOKEN')


  constructor(private http: HttpClient, private storage: Storage ,private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  closeModal(){
    this.popoverCtrl.dismiss();
  }

  async makeNewPost(){
    this.accessToken.then((data) => {
      this.token = data;
      this.decoded = jwt_decode(data, {complete: true});
      
      //Then we put the id as a param on the url
      this.url = `http://192.168.0.109:3000/api/post/${this.decoded.id}`;

      return this.url, this.decoded
    })

    .then(() => {

      // We define our headers
      let headers = new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "Bearer " + this.token
      });

      const body = {
        post_text: this.text
      }

      // We log to see if everything is ok
      console.log(`Calling this url ${this.url}`);

      //Finally we subscribe to the http call and we return the response 
      this.request = this.http.post(this.url, body, {headers})
      this.request.subscribe((response) => {
        console.log(response)
      });

      // Output para escuchar el evento y emit new post
      
      this.popoverCtrl.dismiss();

    }) // End of .then
    .catch(error => console.log(error))
  }

} 

