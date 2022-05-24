import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.component.html',
  styleUrls: ['./detalle-historial.component.css']
})
export class DetalleHistorialComponent implements OnInit {
  constructor() { }

  @Input() infoTrans={
    "transHash":"",
    "destination":"", 
    "origin":"",
    "_cost":"",
    "_idDriver":"",
    "_idPassenger":"",
    "_idVehicle":"",
    "timestamp":"",
  };
  @Input() esUsuario=true;
  
  ngOnInit(): void {
  }

}
