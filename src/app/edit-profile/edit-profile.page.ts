import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { PopoverController, NavController } from '@ionic/angular';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  public user = new Array;
  public putUrl;
  public userUrl;
  public bio;

  accessToken = this.storage.get('ACCESS_TOKEN')
  
  public decoded;
  public token;

  constructor(private storage: Storage, private http: HttpClient, private popoverCtrl: PopoverController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  closeModal(){
    this.popoverCtrl.dismiss();
  }

  async editUser(id) {

    this.accessToken.then((data) => {
      this.token = data;
      this.decoded = jwt_decode(data, {complete: true});
      
      //Then we put the id as a param on the url
      this.putUrl = `http://192.168.0.109:3000/api/profile/${this.decoded.id}`;

      return this.putUrl, this.decoded
    })

    .then(() => {

      // We define our headers
      let headers = new HttpHeaders({
        "Content-type": "application/json",
        "Authorization": "Bearer " + this.token
      });

      const body = {
        bio: this.bio
      }

      // We log to see if everything is ok
      console.log(`Calling this url ${this.putUrl}`);

      //Finally we subscribe to the http call and we return the response 
      this.putUrl = this.http.put(`http://192.168.0.109:3000/api/profile/${id}`, body, {headers})
      this.putUrl.subscribe((response) => {
        console.log(response)
      });
      
      this.popoverCtrl.dismiss();

    }) // End of .then
    .catch(error => console.log(error))
  }

}
