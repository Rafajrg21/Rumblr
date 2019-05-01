import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { UsernameValidator } from  '../validators/username';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public registrationForm: FormGroup;

  public submitAttempt: boolean = false;

  constructor(private authService: AuthService, public formBuilder: FormBuilder, public navCtrl: NavController) {

    this.registrationForm = formBuilder.group({
      email: ['', 
        Validators.compose([
          Validators.maxLength(70), 
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
          Validators.required])
      ],
      password: ['', 
        Validators.compose([
          Validators.required, 
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z0-9]*')])
      ],
      username: ['', 
        Validators.compose([
        Validators.required, 
        Validators.pattern('[a-zA-Z]*')]),
        UsernameValidator.checkUsername
      ],
      bio: ['']
    });
  } // End constructor 

  ngOnInit() {
  }

  prev(){
    this.navCtrl.navigateRoot('/')
  }

  save(form){
    this.submitAttempt = true;
    form.value = this.registrationForm.value;
    console.log(form.value)
    
    this.authService.register(form.value).subscribe((res) => {
      console.log("success!")
      this.navCtrl.navigateRoot('/app/tabs/home')
    })
  }

} // End class
