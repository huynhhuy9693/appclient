import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  FormData: FormGroup;
  constructor(private builder:FormBuilder , private contact: ContactService) { }

  ngOnInit() {
    this.FormData = this.builder.group(

      {
        Fullname : new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
        Comment: new FormControl('', [Validators.required])
      }
    )
    
  }
  onSubmit(FormData) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    location.href = ''
    console.log(response)
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    })
    }

}
