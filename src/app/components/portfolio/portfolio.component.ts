import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Portfolio } from '../../model/portfolio.model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
     portfolio: any = [];
     userName!: string;
     ticker: any;
     quantity: any;
     totalValue:number=0;
     sellquantity:any;


     constructor(
       private route: ActivatedRoute,
       private portfolioService: PortfolioService
     ) {}

     ngOnInit() {

       this.route.queryParams.subscribe((params:any) => {
         this.userName = params['userName'];

         if (this.userName) {

             this.portfolioService.getPortfolio(this.userName).subscribe(data => {
             this.portfolio = data;
           });
         } else {
           console.error('Username not provided in query params.');
         }
       });
      console.log("init this.userName",this.userName);

      this.getTotalValue(this.userName);

    }
    addStock(userName:any,ticker:any,quantity:any){
      console.log("this.userName",this.userName);
      this.portfolioService.addStock(this.userName,this.ticker, this.quantity).subscribe(() => {
      this.portfolioService.getPortfolio(this.userName).subscribe(data => {
                   this.portfolio = data;
                   });
                   this.ngOnInit();
       });
    }

    removeStock(userName:any,ticker:any,sellquantity:any){
      console.log("removeStock this.userName",this.userName);
      console.log("removeStock this.ticker",ticker);
      console.log("removeStock this.quantity",this.sellquantity);
      this.portfolioService.removeStock(this.userName,ticker,this.sellquantity).subscribe(() => {
            this.portfolioService.getPortfolio(this.userName).subscribe(data => {
                   this.portfolio = data;
                   });
                   this.ngOnInit();
            });
    }

    getTotalValue(userName:string) {
        this.portfolioService.getTotalValue(this.userName).subscribe((data:number) => {
            this.totalValue = data;
            console.log("this.totalValue",this.totalValue);
             });
      }

}
