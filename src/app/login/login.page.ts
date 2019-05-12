import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, private authService: AuthService) { }

  ngOnInit() {
  }

  login(form){
    console.log(form.value)
    this.authService.login(form.value).subscribe((res) => {
      this.navCtrl.navigateRoot('/app/tabs/home');
    })
  }

  async navSignup(){
    this.navCtrl.navigateRoot('/signup')
  }
  
}
