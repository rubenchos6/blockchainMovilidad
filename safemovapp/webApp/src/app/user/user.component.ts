import { Component, OnInit } from '@angular/core';
import {SafemovService} from '../services/safemov.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [SafemovService]
})

export class UserComponent implements OnInit  {

  constructor(private safemovService: SafemovService) { }

  ngOnInit(): void {
    this.getAccounts();
  }
  
  //Initial variables
  costo = 20;
  cotizar=false;
  tomarViaje=false;
  actual=true;
  detalle=false;
  drivers=[
    {
      "id": 0,
      "name": "Gina",
      "picture": "images/Gina.jpeg",
      "nTrips": "+500",
      "calif": "4.9" 
    }
  ];
  tH:string='prueba';
  driver=this.drivers[0];
  transacciones=[
    {"transHash":"asdfghj",
      "timestamp":"20-15-2022"
    }
  ];
  dataInit = {
      'driver':'0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      'passenger':'',
      'vehicle':'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
      'amount':String(this.costo),
      'origin':'',
      'destination':'',
      'timestamp':''
  }
  trans:any;
  tripsHistorial:Array<{}>=[];
  aps=[
    {"ap":"ap1",
     "timestamp":"20-15-2022"
    }
  ];
  selected:any;
  
  //////////////////////////////////////////////////////////////
  //Funciones
  //Activar interfaz de viaje actual
  act(){
    this.actual=true;
  }
  
  //Activar interfaz de historial
  historial(){
    const that=this;
    this.getInfoInitT();
  }
  
  //Activar interfaz de cotización
  configTripData(){
    this.cotizar=true;
    this.getAccounts();
  }
  
  //Inicio de viaje
  initTrip(){
    this.initT();
    console.log(this.dataInit);
  }
  
  //Obtener cuenta asociada a MetaMask
  getAccounts = () => {
    const that = this;
    this.safemovService.getAccounts().
    then(function(retAccount: any) {
      console.log(retAccount);
      that.dataInit.passenger = retAccount[0];
      console.log('user.components :: getAccounts :: this.reg');
      console.log(that.dataInit);
    }).catch(function(error:any) {
      console.log(error);
    });
  }
  
  //método que invoca el servicio de initTrip del contrato inteligente
  initT = () => {
    //Actualizar datos del viaje
    this.dataInit['origin']=((document.getElementById("origin") as HTMLInputElement).value);
    this.dataInit['destination']=((document.getElementById("destination") as HTMLInputElement).value);
    this.dataInit['timestamp']=(new Date()).toString();
    console.log(this.dataInit);
    const that = this;
    //Invocar servicio del viaje
    this.safemovService.initTrip(that.dataInit).then((response: any) =>{
      console.log('user.components :: initT :: endOfTrans');
      console.log(response);
      that.tH=response;
      that.tomarViaje=true;
    });
  }
  
  //Obtener información del viaje utilizando servicio del contrato inteligente
  getInfoInitT = () => {
    const that = this;
    this.safemovService.getTripsRelatedToAccount(that.dataInit.passenger,'p').then((response) =>{
      console.log('user.components :: getTripsRelatedToAccount :: endOfTrans');
      console.log(response);
      that.transacciones=[];
      response.forEach(function (trip:any) {
        var val={
          "transHash":trip['transactionHash'],
          "timestamp":trip['returnValues']['_timestamp'],
        }
        var tr={
          "transHash":trip['transactionHash'] as string,
          "destination":trip['returnValues']['destination'] as string, 
          "origin":trip['returnValues']['origin'] as string,
          "_cost":trip['returnValues']['_cost'] as string,
          "_idDriver":trip['returnValues']['_idDriver'] as string,
          "_idPassenger":trip['returnValues']['_idPassenger'] as string,
          "_idVehicle":trip['returnValues']['_idVehicle'] as string,
          "timestamp":trip['returnValues']['_timestamp'] as string,
        }
        that.tripsHistorial.push(tr);
        that.transacciones.push(val);
        that.actual=false;
      }); 
    });
  }
  
  //Obtener información del viaje específico seleccionado en el historial
  getSpecificTrip(e:String){
    this.selected = this.tripsHistorial.find((obj) => {
      return obj["transHash" as keyof typeof obj] === e;
    });
    console.log(this.selected);
    this.detalle=true;
    this.trans=this.selected;
    this.getInfoAP();
  }
  
  //Obtener información de los aps y timestamps del viaje específico seleccionado en el historial
  getInfoAP = () => {
    const that = this;
    this.safemovService.getAPsInfoFromTransaction(that.selected.transHash).then((response: any) =>{
      console.log('user.components :: getAPsInfoFromTransaction :: endOfTrans');
      console.log(response);
      that.aps=[];
      response.forEach(function (ap:any) {
        var val={
          "ap":ap['returnValues']['_ap'],
          "timestamp":ap['returnValues']['_timestamp'],
        }
        that.aps.push(val);
      });
      
    });
  }
}
