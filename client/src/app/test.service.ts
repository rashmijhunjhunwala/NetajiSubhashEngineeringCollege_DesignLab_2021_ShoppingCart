import { Injectable } from '@angular/core';
import { User } from './models/User';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private User: User=<any>{};
  constructor(private webRequest: WebRequestService) { }
  setUser(User: User)
  {
    this.User=User;
  }
  getUser()
  {
    return this.User;
  }

  login(payload:Object)
  {
    return this.webRequest.post('user/login', payload);
  }


  registerEmployer(payload:Object)
  {
    return this.webRequest.post('user/register', payload);
  }


  logOut(payload:Object)
  {
    return this.webRequest.postauth('user/logout', payload, localStorage.getItem("Token"));
  }

  getAllProducts() {
    return this.webRequest.get('getAllProducts');
  }
  getCartProducts() {
    return this.webRequest.getauth('user/getCart',localStorage.getItem("Token"));
  }

  addProductToCart(id:any) {
    return this.webRequest.postauth(`user/addProducts/${id}`,{},localStorage.getItem("Token"));
  }
  removeProductFromCart(id:any) {
    return this.webRequest.postauth(`user/removeProducts/${id}`,{},localStorage.getItem("Token"));
  }
}
