import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formulario: FormGroup;

  constructor(public fb: FormBuilder) { 
    this.formulario =this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

}
