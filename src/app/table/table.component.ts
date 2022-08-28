import { Component, Input,Output, OnInit, EventEmitter } from '@angular/core';
import { ContactModel } from '../models';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'phone'];
  
  @Input() dataSource:ContactModel[]=[];
  
  @Output() onDataChanged = new EventEmitter<ContactModel[]>();

  constructor( contactService:ContactService) {
   }

  ngOnInit(): void {
  }
  
}
