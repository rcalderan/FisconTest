import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id:number;
  username: string;
  age: string;
  title: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:1,username: "1", age: 'Hydrogen', title: 'H'},
  { id:2,username: "2", age: 'Hydrogen', title: 'H'},
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id','username', 'age', 'title'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
