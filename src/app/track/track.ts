export class Track {
  id: number;

title:string;
track:   File;
album_id: number;            //     formData    int
explicit:  number;           //      formData    int , x ∈ { 0 , 1 }
disc_number:number;          //        formData    int
position: number;                //       formData    int
isrc:string;                    //        formData    string (US-NNN-YY-DDDDD [will be generated if not provided])
artist_id:number;                //        formData    int (will be taken from album if not provided)
track_language: string;        //       formData    string
composer:string;                //        formData    string
additional_artists: string;    //       formData    string
label_track_id:string;        //        formData    string
cover_song:number;            //        formData    int , x ∈ { 0 , 1 }

//Auciliars
artist_name:string;
file_name:string;

track_file:{filename:string};
}


