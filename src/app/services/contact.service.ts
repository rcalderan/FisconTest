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

  public static contacts : ContactModel[]=[];

  constructor() { 
    this.getContacts();
  }

  //get from storage
  private getContacts() {
    const session=sessionStorage.getItem(SESSION_NAME);
    ContactService.contacts = session ? this.mapJson(session) : [];
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
    for (let index = 1; index <= ContactService.contacts.length; index++) {
      ContactService.contacts[index-1].id=index;
    }
  }

  public create(model: ContactModel ):boolean{
    try{
      ContactService.contacts.push(model);
      return this.save();
    }catch(error){
      console.log(error);
      //if fails, then reset array
      this.getContacts();
      return false;
    }
  }

  //save to session
  private save(){    
    try{
      this.ajustIndexes();
      const toSession = JSON.stringify(ContactService.contacts);
      sessionStorage.setItem(SESSION_NAME, toSession);
      return true;
    }catch(error){
      return false;
    }
  }

  public getContact(id:number):ContactModel|undefined{
    return ContactService.contacts.find(contact=>contact.id===id);
  }
  public delete(id:number):boolean{
    try{
      const beforeLen = ContactService.contacts.length;
      const filtered = ContactService.contacts.filter(contact => contact.id != id);
      
      if(filtered.length!==beforeLen){
          ContactService.contacts=filtered;
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
      ContactService.contacts=[];
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
