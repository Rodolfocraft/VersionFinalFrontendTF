import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calificaciondocente',
  templateUrl: './calificaciondocente.component.html',
  styleUrls: ['./calificaciondocente.component.css']
})
export class CalificaciondocenteComponent {
  constructor(public route:ActivatedRoute){}
}
