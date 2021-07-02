import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestService } from './test.service';
import { WebRequestService } from './web-request.service';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponentComponent,
    DashboardComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'user/register', component: RegisterComponentComponent},
      { path: 'user/dashboard/:id', component: DashboardComponent},
      { path: 'user/Cart/:id', component: CartComponent},
    ])
  ],
  providers: [HttpClientModule,WebRequestService,TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
