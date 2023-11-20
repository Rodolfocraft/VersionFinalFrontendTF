import { Component, OnInit,  } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reporte05',
  templateUrl: './reporte05.component.html',
  styleUrls: ['./reporte05.component.css']
})
export class Reporte05Component implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[];
  barChartType:ChartType='pie';
  barChartLegend=true;
  barChartData:ChartDataset[]=[];
  constructor(private uS:UserService){}
  ngOnInit(): void {
    this.uS.getCount().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.genero);
      this.barChartData=[
        {
          data:data.map((item)=>item.contadorusuarios),
          label:'Cantidad de usuarios por genero'
        }
      ]
    })
  }

}
