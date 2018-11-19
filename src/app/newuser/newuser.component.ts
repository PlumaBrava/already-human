import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  customer = { id: 1, name: 'Ms. Mary', age: 23 };

  constructor() { }

  ngOnInit() {
  }

}
