import { Component, OnInit } from '@angular/core';
import { MailService }  from '../service/mail.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-laflota',
  templateUrl: './laflota.component.html',
  styleUrls: ['./laflota.component.css']
})
export class LaflotaComponent implements OnInit {
 data:any;
  constructor(private mailService: MailService) { }

  ngOnInit() {
  }

GetArtista(){
  console.log("SetArtista");
  this.mailService.GetArtista("SetArtista").subscribe(
  data => {
    this.data = data;
    console.log(data);
  },
 error =>{
   console.log(error);
 }

  );
 }

}
