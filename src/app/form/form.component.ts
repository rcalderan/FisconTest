import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  public nome:string='';
  public telefone:string='';

  ngOnInit(): void {
  }

  public limpar():void{
    alert('Limpar');
  }
  
  public salvar():void{
    alert('salvar');
  }

}
