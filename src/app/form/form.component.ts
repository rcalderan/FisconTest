import { Component, OnInit } from '@angular/core';
import { Contact, DEFAULT_CONTACT } from '../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  public contactList? : Contact[]=[
    { id:1,name: "1", phone: 'Hydrogen'},
    { id:1,name: "1", phone: 'Hydrogen'},
  ];

  public contact:Contact = DEFAULT_CONTACT;

  ngOnInit(): void {
  }

  public limpar():void{
    this.contact=DEFAULT_CONTACT;
  }
  
  public salvar():void{
    this.contactList?.push({ id:1,name: "1", phone: 'Hydrogen'});
    alert(this.contactList?.length);
  }

}
