import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  public users = new Array;

  public usersUrl;
  public usersRequest;
  public searchBar;

  constructor(private http: HttpClient, private navCtrl: NavController){ } 

  searchUsers(){

      // We define our header
      let headers = new HttpHeaders({
        "Content-type": "application/json",
      });

      this.usersUrl = `http://192.168.0.109:3000/api/users/${this.searchBar}`;
      console.log(this.usersUrl)

      this.usersRequest = this.http.get(this.usersUrl, {headers});
      this.usersRequest.subscribe((data) => {
        console.log(data)
        
        data.forEach(user => {
          this.users
          .push({
            user_id: user.id,
            username: user.username,
            email: user.email, 
            avatar: user.avatar
          })
        })        

        return this.usersRequest
      })
  }// End of function

  goToUser(id){
    this.navCtrl.navigateRoot(`/user/${id}`);
  }

}
