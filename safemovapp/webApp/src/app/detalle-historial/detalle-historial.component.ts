import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.component.html',
  styleUrls: ['./detalle-historial.component.css']
})
export class DetalleHistorialComponent implements OnInit {
  constructor() { }

  @Input() infoTrans="";
  
  esUsuario = true;
  transaccion="";
  conductor="";
  usuario="";
  direccion="";
  costo="";
  timestamp="";
  destino="";
  origen="";
  ngOnInit(): void {
  }

}
