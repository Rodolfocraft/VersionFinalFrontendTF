import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-reporte04',
  templateUrl: './reporte04.component.html',
  styleUrls: ['./reporte04.component.css']
})
export class Reporte04Component implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[];
  barChartType:ChartType='bar';
  barChartLegend=true;
  barChartData:ChartDataset[]=[];
  constructor(private pS:ProfesoresService){}
  ngOnInit(): void {
    this.pS.getCount().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nombreUniversidad);
      this.barChartData=[
        {
          data:data.map((item)=>item.cantidadProfesores),
          label:'Cantidad de profesores por universidad'
        }
      ]
    })
  }
}
