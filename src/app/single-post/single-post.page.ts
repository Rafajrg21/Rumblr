import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.page.html',
  styleUrls: ['./single-post.page.scss'],
})
export class SinglePostPage implements OnInit {

  public post = new Array;
  postId = null;
  public url;

  constructor(private http: HttpClient, private navParams: NavParams, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.postId = this.navParams.get('post_id');

    this.url = this.http.get(`http://192.168.0.109:3000/api/post/${this.postId}`);
    this.url.subscribe((response) => {
      //console.log(response)

      response.forEach(element => {
        this.post 
        .push({
          post_text: element.post_text,
          post_image: element.post_image,
        });
      });
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
