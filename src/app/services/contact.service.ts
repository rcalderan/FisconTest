import { Injectable } from '@angular/core';
import { Contact, ContactModel, SESSION_NAME } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contacts : ContactModel[]=[];

  constructor() { }

  //get from storage
  public getContacts() :ContactModel[] {
    const session=sessionStorage.getItem(SESSION_NAME);
    this.contacts= session ? this.mapJson(session) : [];
    return this.contacts;
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
    for (let index = 0; index < this.contacts.length; index++) {
      this.contacts[index].id=index+1;
    }
  }

  public create(model: ContactModel ):boolean{
    try{
      this.contacts.push(model);
      return this.save();
    }catch(error){
      console.log(error);
      //if fails, then reset array
      this.contacts =this.getContacts();
      return false;
    }
  }

  //save to session
  private save(){    
    try{
      this.ajustIndexes();
      const toSession = JSON.stringify(this.contacts);
      sessionStorage.setItem(SESSION_NAME, toSession);
      return true;
    }catch(error){
      this.contacts =this.getContacts();
      return false;
    }
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
        return this.save();
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
      this.contacts =this.getContacts();
      return false;
    }
  }
}
