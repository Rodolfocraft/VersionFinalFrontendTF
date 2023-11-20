import { Component, OnInit } from '@angular/core';
import { Profesores } from 'src/app/models/profesores';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  profesores:Profesores[]=[]
  constructor(public pS:ProfesoresService){}
  ngOnInit(): void {
    this.pS.list().subscribe((data)=>{
      this.profesores=data;
    })
    console.log(this.profesores)
  }

}
