import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
//import { HeadNav } from 'src/app/include/header';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private router:Router, private auth:AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  login() {
    //  alert("account has been created")
    const data = this.loginForm.value
    this.auth.signin(data).subscribe((res) => {
      if(res.success){
        localStorage.setItem('token',res.token)
        // this.router.navigate(['/profile']);
       this.router.navigate(['/dashboard']);
      }else{
        alert(res.message)
      }
    
    }, res => {
      alert("login faied")
    })
  }
}
