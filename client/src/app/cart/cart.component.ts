import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from '../models/CartItems';
import { TestService } from '../test.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems: CartItems[] = [];
  total:number=0
  constructor(private testService:TestService,private router: Router) { }

  
  logOut()
  {
    this.testService.logOut({}).subscribe(response => {console.log(response);
      localStorage.removeItem("Token");
      localStorage.removeItem("UserId");
      this.router.navigate(['/']);
    })
  }

  calcTotalPrice() {
    this.total = 0
    for(let i=0;i<this.cartItems.length;i++) {
      const finalPrice = this.cartItems[i].productId.price * this.cartItems[i].quantity
      console.log(finalPrice)
      this.total += finalPrice;
    }
  }
  getCartProducts()
  {
    this.testService.getCartProducts().subscribe((result:any)=> {
      console.log(result);
      this.cartItems=result;
      this.calcTotalPrice();
    });
  }

  routeToDashboard() {
    this.router.navigate(['/user/dashboard',localStorage.getItem("UserId")]);
  }

  decreaseQuantityCart(id:any) {
    this.testService.removeProductFromCart(id).subscribe(response => {
    console.log(response);
    this.getCartProducts();
  });
  
  }
  ngOnInit(): void {
    this.getCartProducts();
  }

}

