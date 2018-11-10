export class Album {
  id: number;
  title: string;
  label_id: number;
  artist_id: number;
  release_date: string;
  p_line: string;
  c_line: string;
  explicit: number;
  cover: File;
  upc: string;
  genre: string;
  album_genres: string;
  album_territories: string;
  language: string;
  secondary_language: string;


  // Campos auxiliares para el formulario
  labelName:string;
  artistaName:string;

  //cuando se envien los datos al server, se concatenaran estos dos valores
  p_line_yyyy:string;
  p_line_text:string;


//cuando se envien los datos al server, se concatenaran estos dos valores
  c_line_yyyy:string;
  c_line_text:string;



}


// title        formData    string
// label_id        formData    int
// artist_id        formData    int
// release_date        formData    date (YYYY-mm-dd)
// p_line        formData    string (YYYY Copyright)
// c_line        formData    string (YYYY Copyright)
// explicit        formData    int , x ∈ { 0 , 1 }
// cover        formData    file
// upc        formData    string (numeric string 10..13 chars [will be generated if not provided])
// genre        formData    string , x ∈ { genres }
// album_genres        formData    string ([{genre:dance_elec},{genre:rap}, ...]) , x ∈ { genres }
// album_territories        formData    string ([{territory:UK},{territory:US},...]) , x ∈ { territories }
// language        formData    string , x ∈ { Afrikaans , Arabic , Bulgarian , Cantonese , Catalan , Chinese , Croatian , Czech , Danish , Dutch , English , Estonian , Finnish , French , German , Greek , Hebrew , Hindi , Hungarian , Icelandic , Indonesian , Italian , Japanese , Kazakh , Korean , Lao , Latvian , Lithuanian , Malay , Norwegian , Polish , Portuguese , Romanian , Russian , Slovak , Slovenian , Spanish , Swedish , Tagalog , Tamil , Telugu , Thai , Turkish , Ukrainian , Urdu , Vietnamese , Zulu }
// secondary_language        formData    string