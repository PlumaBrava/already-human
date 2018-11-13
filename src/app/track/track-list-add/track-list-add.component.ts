import { Component, OnInit } from '@angular/core';
import { MailService }  from '../../service/mail.service';
import { MensajesService }  from '../../mensajes/mensajes.service';
import { NgbDropdownModule,NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Album } from '../../album/album';
import { Track } from '../track';
import { TrackObjectComponent } from '../track-object/track-object.component';

import {Router} from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-track-list-add',
  templateUrl: './track-list-add.component.html',
  styleUrls: ['./track-list-add.component.css']
})
export class TrackListAddComponent implements OnInit {
album:Album;
numberDisc;
numberTracks;
trackArray:Track[]=  [];
  constructor(
               private mailService: MailService,
                  private mensageService:MensajesService,
                  private router: Router
      ) { }

  ngOnInit() {
         this.album=this.mensageService.getAlbum();
         this.numberDisc=this.mensageService.getListtrack_numberDisc();
         this.numberTracks=this.mensageService.getListtrack_numberTracks();



         console.log('TrackListAddComponent');
         console.log('album',this.album);
         console.log('numberDisc',this.numberDisc);
         console.log('numberTracks',this.numberTracks);

         for (let i=0;i<this.numberTracks; i++)
         {
            let t=new Track();
            t.album_id=this.album.id;
            t.artist_id=this.album.artist_id;
            t.artist_name=this.album.artistaName;
            t.disc_number=this.numberDisc;
            t.position=i+1;
            t.track_language=this.album.language;
            this.trackArray.push(t);

         }
         console.log('this.trackArray',this.trackArray);

  }

}
