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

  public contact:ContactModel = new Contact('','').getModel();

  public msg:Message={
    severity:SEVERITY.WARNING,
    message:''
  };

  ngOnInit(): void {
  }

  public limpar():void{
    this.contact= new Contact('','').getModel();
    this.msg.message='';
  }
  
  public salvar():void{
    setTimeout(()=>{
      this.msg.message='';
    },5000);
    if(this.validateName()){
      this.msg.severity = SEVERITY.WARNING;
       this.msg.message='Insira um nome válido.'
      return;
    }      
    const gotSaved=this.contactSertice.create(this.contact);
    this.msg.severity = gotSaved ? SEVERITY.SUCCESS : SEVERITY.DANGER;
    this.msg.message =gotSaved ? 'Contato Salvo!' : 'Não foi possivel salvar contato.';
  }

  public validateName():boolean{
    return this.contact.name.length < 4;
  }

}
