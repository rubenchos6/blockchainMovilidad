import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  destino="";
  origen="";
  usuario="";
  tomarViaje=true;
  costo = 58;
  actual=true;
  detalle=false;
  transacciones=[
    {"transHash":"asdfghj",
      "timestamp":"20-15-2022"
    },
    {"transHash":"asdfghj",
      "timestamp":"20-15-2022"
    }
  ]

  terminar(){
    alert("TERMINAMOS!");
  }

  trans:any;
  holaMundo(e:String){
    console.log(e);
    this.detalle=true;
    this.trans=e;
  }

}
