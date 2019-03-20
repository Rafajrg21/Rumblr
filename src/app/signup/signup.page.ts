import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsernameValidator } from  '../validators/username';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChild('signupSlider') signupSlider;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;

  public submitAttempt: boolean = false;

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController) {

    this.slideOneForm = formBuilder.group({
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
      ]
    });

    this.slideTwoForm = formBuilder.group({
      username: ['', 
        Validators.compose([
        Validators.required, 
        Validators.pattern('[a-zA-Z]*')]),
        UsernameValidator.checkUsername
      ],
      bio: ['']
    })

   }

  ngOnInit() {
  }

  next(){
    this.signupSlider.slideNext();
  }

  prev(){
    this.signupSlider.slidePrev();
  }

  save(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
        this.signupSlider.slideTo(0);
    } 
    else if(!this.slideTwoForm.valid){
        this.signupSlider.slideTo(1);
    }
    else {
        console.log("success!")
        console.log(this.slideOneForm.value);
        console.log(this.slideTwoForm.value);
        this.navCtrl.navigateRoot('/app/tabs/home')
    }

  }

}
