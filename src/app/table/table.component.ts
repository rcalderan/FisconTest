import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Contact } from '../models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'phone'];
  
  @Input() contactList?:Contact[];

  dataSource=[
    { id:1,name: "João", phone: '(16)992929291)'},
    { id:2,name: "Mack", phone: '(11)921222211'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.dataSource = changes.contactList;    
  }

}
