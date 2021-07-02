import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { TestService } from '../test.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public products: Product[] = [];
  constructor(private testService:TestService,private router: Router) { }

  
  logOut()
  {
    this.testService.logOut({}).subscribe(response => {console.log(response);
      localStorage.removeItem("Token");
      localStorage.removeItem("UserId");
      this.router.navigate(['/']);
    })
  }

  getAllProducts()
  {
    this.testService.getAllProducts().subscribe((result:any)=> {
      console.log(result);
      this.products=result;
    });
  }

  routeToCart() {
    this.router.navigate(['/user/Cart',localStorage.getItem("UserId")]);
  }

  addToCart(id:any) {
    this.testService.addProductToCart(id).subscribe(response => {console.log(response)});
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

}
