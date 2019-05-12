import { Component } from '@angular/core';
import { PopoverController, ModalController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SinglePostPage } from '../single-post/single-post.page';
import { MakePostPage } from '../make-post/make-post.page';
import { MakeCommentPage } from '../make-comment/make-comment.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public posts = new Array;
  public url;
  public likesUrl;
  public likeCounter = 0;

  constructor(private http: HttpClient, private popoverCtrl: PopoverController, private modalCtrl: ModalController, private navCtrl: NavController){ }

  ngOnInit() {
    this.displayAllPosts();
  }

  // Subscribe to popover event

  /*getLikes(id){
    this.likesUrl = this.http.get(`http://localhost:3000/api/posts/${id}/likes`)
    this.likesUrl.subscribe((response) => {
      response.forEach(like => this.likeCounter++)
    })
  }*/

  displayAllPosts() {
    this.url = this.http.get('http://192.168.0.109:3000/api/posts');
    this.url.subscribe((response) => {
      console.log(response)

      response.forEach(element => {
        let date = element.createdAt.toDateString;
        
        this.posts 
        .push({
          id: element.id,
          post_text: element.post_text, 
          post_image: element.post_image, 
          date: element.createdAt, 
          user: element.User.username,
          user_id: element.User.id,
          avatar: element.User.avatar,
        });
      });
    });
  }

  goToUser(id){
    this.navCtrl.navigateRoot(`/user/${id}`);
  }

  async displayPost(id) {
    const modal = await this.modalCtrl.create({
      component: SinglePostPage,
      componentProps:{
        post_id: id
      }
    });
    modal.present();

  }

  async makePost() {
    const popover = await this.popoverCtrl.create({
      component: MakePostPage
    });
    popover.present();
  }

  async openComments(id) {
    const comment = await this.modalCtrl.create({
      component: MakeCommentPage,
      componentProps:{
        post_id: id
      }
    });
    comment.present();
  }

}
