import { Component, Input,Output, OnInit, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TitleStrategy } from '@angular/router';
import { ContactModel } from '../models';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'phone','del'];
  
  @Input()
  dataSource!: MatTableDataSource<ContactModel>;
  
  constructor( private contactService:ContactService) {
   }
   
  ngOnInit(): void {
  }
  

  //remove from ID
  public removeFrom(id:number){
    try{
      if(this.contactService.delete(id)){
        console.log('Contato excluído');
      }else{
        console.log('Não foi possível excluir contato específico');
      }
    }catch(error){
      console.log(error);
    }
    //update table anyway
    this.dataSource.data = this.contactService.getContacts();
  }
  
}
