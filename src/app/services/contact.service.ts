import { Injectable } from '@angular/core';
import { Contact, ContactModel, SESSION_NAME } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  /**
   * // Salva os dados na sessionStorage
sessionStorage.setItem('chave', 'valor');

// Obtém os dados da sessionStorage
var data = sessionStorage.getItem('chave');
   */

  private contacts : ContactModel[]=[];

  constructor() { 
    this.getContacts();
  }

  //get from storage
  private getContacts() {
    const session=sessionStorage.getItem(SESSION_NAME);
    this.contacts = session ? this.mapJson(session) : [];
  }

  //map data from storage
  private mapJson(json:string):ContactModel[]{
    try{
      const parsed:ContactModel[] = JSON.parse(json);
      return parsed;
    }catch(error){
      console.log(error);
      return [];
    }
  }

  //ajust all index
  private ajustIndexes(){
    for (let index = 1; index <= this.contacts.length; index++) {
      this.contacts[index-1].id=index;
    }
  }

  public create(name:string, phone:string){
    try{
      const newContact =new Contact(name, phone);
      this.contacts.push(newContact.getModel());
      this.save();
    }catch(error){
      console.log(error);
      //if fails, then reset array
      this.getContacts();
    }
  }

  //save to session
  private save(){    
    this.ajustIndexes();
    const toSession = JSON.stringify(this.contacts);
    sessionStorage.setItem(SESSION_NAME, toSession);
  }

  public getContact(id:number):ContactModel|undefined{
    return this.contacts.find(contact=>contact.id===id);
  }
  public delete(id:number):boolean{
    try{
      const beforeLen = this.contacts.length;
      const filtered = this.contacts.filter(contact => contact.id != id);
      
      if(filtered.length!==beforeLen){
          this.contacts=filtered;
          //update indexes
          this.ajustIndexes();
          this.save();
          return true;
      }
      return false;
    }catch(error){
      console.log(error);
      return false;
    }
  }

  public deleteAll():boolean{
    try{
      sessionStorage.removeItem(SESSION_NAME);
      this.contacts=[];
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
