import { Component, OnInit } from '@angular/core';
import { Universidad } from 'src/app/models/universidad';
import { UniversidadService } from 'src/app/services/universidad.service';

@Component({
  selector: 'app-card-universidad',
  templateUrl: './card-universidad.component.html',
  styleUrls: ['./card-universidad.component.css']
})
export class CardUniversidadComponent implements OnInit{
  universidad:Universidad[]=[]
  constructor(public uS:UniversidadService){}
  ngOnInit(): void {
    this.uS.list().subscribe((data)=> {
      this.universidad=data;
    })
    console.log(this.universidad)
  }
}
