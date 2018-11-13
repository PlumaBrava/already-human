import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { MailService }  from '../../service/mail.service';
@Component({
  selector: 'app-label-crear',
  templateUrl: './label-crear.component.html',
  styleUrls: ['./label-crear.component.css']
})
export class LabelCrearComponent implements OnInit {

  constructor(
            private mailService: MailService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

      submitted = false;
      submittedMensage=null;
      error=null;

crearLabelForm = this.fb.group({
  name: ['', Validators.required],
});

esperandoDatos:boolean=false;

  ngOnInit() {
  }
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn('onSubmit');
  console.warn(this.crearLabelForm.value);
  console.warn('name',this.crearLabelForm.value.name);

  this.error=null;

  let formData:FormData = new FormData();

        formData.append('name',this.crearLabelForm.value.name);

this.esperandoDatos=true;

   this.mailService.setLabel(formData).subscribe(
  data => {
     this.submitted = true;
     this.esperandoDatos=false;
    console.log(data);

    if (data.response.body){
      this.submitted=data.response.body;
       // this.router.navigate(['./albumCrear/'+data.response.body.id]);
    }
  },
 error =>{

     console.log(error);
     this.esperandoDatos=false;

     console.log(error.message);

   if (error.message){
      this.error=error.message;
    }

 }
)
}
  // onSubmit() {
}
