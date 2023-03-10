import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup
  status:any
  user:any;
  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: [''],
      password: [''],
    })
  }
  logIn() {
    this._http.get<any>("http://localhost:3000/users").subscribe(res=>{
       this.user= res.find((a:any)=>{
        sessionStorage.setItem('userdata',JSON.stringify(this.user));
        return a.username === this.loginform.value.username && a.password === this.loginform.value.password  
      })
      
      if(this.user.status === "admin"){
        alert("login successfully");
        this.loginform.reset();
        this.router.navigate(['admin'])
      }else if(this.user.status === "user"){
        alert("login user successfully");
        this.loginform.reset();
        this.router.navigate(['user']);
      }
      else if(this.user.status!= "admin" &&this.user.status!="user"){
        alert("user not found");
      }
    },err=>{
     alert("server side error");
    })
  }
}
