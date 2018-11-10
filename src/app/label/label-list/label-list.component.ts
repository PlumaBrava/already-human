import { Component, OnInit } from '@angular/core';

import { MailService }  from '../../service/mail.service';
import { MensajesService }  from '../../mensajes/mensajes.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.css']
})
export class LabelListComponent implements OnInit {

  data:any;
 itemsCount=1;
 page:number=1;
 pageSize=50;
 collectionSize=1200;
   esperandoDatos:boolean=true;
  constructor(private mailService: MailService, private mensageService:MensajesService,private location: Location) { }

  ngOnInit() {
      this.GetLabel('',1);
  }

GetLabel(search:any,page:number){
  console.log("SetArtista");
  console.log("search: "+search);
  console.log("page: "+page);
   this.esperandoDatos=true;
  this.mailService.GetLabel(search,page).subscribe(
  data => {
    this.data = data;
    // this.collectionSize = data.body.itemsCount;
    this.page = data.body.page;
    this.pageSize = data.body.perPage;
    // this.collectionSize = Math.round(data.body.itemsCount/this.pageSize*10); ;
    this.collectionSize = data.body.itemsCount;
    this.esperandoDatos=false;
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


agregarLabel(label){
console.log("agregarLabel");
this.mensageService.addLabelList(label);
  this.location.back();
}

borrarLabel(label){
  console.log("borrarLabel");
  this.mensageService.sacarLabelList(label);
}

}
