import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carreraprofesional',
  templateUrl: './carreraprofesional.component.html',
  styleUrls: ['./carreraprofesional.component.css']
})
export class CarreraprofesionalComponent {
  constructor(public route: ActivatedRoute){}
}
