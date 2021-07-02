import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { TestService } from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user:User=<any>{};
  constructor(private testService: TestService, private router: Router) { }

  

  login(email: string, password: string) 
  {
    this.testService.login({"email":email,"password":password}).subscribe((response:any) => {
      this.user=response;
      this.setToken();
    });
  }

  setToken()
  {
    localStorage.setItem("Token", this.user.token);
    localStorage.setItem("UserId", this.user.user._id);
    this.testService.setUser(this.user);
    this.router.navigate(['user/dashboard',this.user.user._id]);
  }

  register()  
  {
    this.router.navigate(['user/register']);
  }
 

  ngOnInit(): void {
  }

}