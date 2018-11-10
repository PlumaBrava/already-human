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
 itemsCount=1;
 page:number=1;
 pageSize=50;
 collectionSize=1200;
  constructor(private mailService: MailService) { }

  ngOnInit() {
  }

GetArtista(search:any,page:number){
  console.log("SetArtista");
  console.log("search: "+search);
  console.log("page: "+page);
  this.mailService.GetArtista(search,page).subscribe(
  data => {
    this.data = data;
    // this.collectionSize = data.body.itemsCount;
    this.page = data.body.page;
    this.pageSize = data.body.perPage;
    // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    this.collectionSize = data.body.itemsCount;
    // this.page=data.
    console.log(data);
    console.log('this.collectionSize: '+this.collectionSize);
    console.log('this.pageSize: '+this.pageSize);
    console.log('this.itemsCount: '+data.body.itemsCount);
    console.log('this.page: '+this.page);
  },
 error =>{
   console.log(error);
 }

  );
 }

 pageChange(){
      console.log('pageChange');
 }

}
