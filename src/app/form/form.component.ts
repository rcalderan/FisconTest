import { Component, OnInit } from '@angular/core';
import { Contact, ContactModel, Message, SEVERITY } from '../models';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor( private contactSertice:ContactService) { }

  public contacts:ContactModel[]=[];
  public contact:ContactModel = new Contact('','').getModel();

  public msg:Message={
    severity:SEVERITY.WARNING,
    message:''
  };

  public phonemask={
    mask: '(00) 00000-0000'
  };

  ngOnInit(): void {
    this.contacts = this.contactSertice.getContacts();
  }

  public limpar():void{
    this.contact= new Contact('','').getModel();
    this.contactSertice.deleteAll();
    this.contacts = this.contactSertice.getContacts();
    this.msg.message='';
  }

  
  public salvar():void{
    if(this.validateName()){
      this.msg.severity = SEVERITY.WARNING;
       this.msg.message='Insira um nome válido.'
      return;
    }
    if(this. validatePhone()){
      this.msg.severity = SEVERITY.WARNING;
       this.msg.message='Insira um telefone válido.'
      return;
    } 
    const gotSaved=this.contactSertice.create(this.contact);
    this.contact= new Contact('','').getModel();
    this.msg.severity = gotSaved ? SEVERITY.SUCCESS : SEVERITY.DANGER;
    this.msg.message =gotSaved ? 'Contato Salvo!' : 'Não foi possivel salvar contato.';
    this.contacts = this.contactSertice.getContacts();
  }

  public validateName():boolean{
    return this.contact.name.length < 4;
  }

  public validatePhone():boolean{
    return this.contact.phone.length < 15;
  }


}
