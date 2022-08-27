import { Component, OnInit } from '@angular/core';
import { Contact } from '../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  public contactList? : Contact[]=[
    new Contact('1','1'),
    new Contact('2','2'),
    
  ];

  public contact:Contact = new Contact('','');

  ngOnInit(): void {
  }

  public limpar():void{
    this.contact= new Contact('','');
  }
  
  public salvar():void{
    this.contactList?.push(this.contact);
  }

}
