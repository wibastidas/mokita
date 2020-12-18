import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goNewSale(){
    this.router.navigateByUrl('/new-sale');
  }

}
