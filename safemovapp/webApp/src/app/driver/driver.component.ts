import { Component, OnInit } from '@angular/core';
import {SafemovService} from '../services/safemov.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [SafemovService]
})
export class DriverComponent implements OnInit {

  constructor(private safemovService: SafemovService) { }

  ngOnInit(): void {
    this.getAccounts();
  }
  
  //Initial variables
  transactionHash="";
  actual=true;
  detalle=false;
  dataInit = {
      'driver':'',
      'passenger':'',
      'amount':'0',
      'origin':'',
      'destination':'',
      'timestamp':''
  }
  validated=false;
  transacciones=[
    {"transHash":"asdfghj",
      "timestamp":"20-15-2022"
    }
  ];
  tripsHistorial:Array<{}>=[];
  trans:any;
  selected:any;
  aps=[
    {"ap":"ap1",
     "timestamp":"20-15-2022"
    }
  ];
  
  //metodo para buscar viaje según th
  buscar(){
    this.transactionHash=((document.getElementById("hash") as HTMLInputElement).value);
    this.getInfoGeneralInitT();
  }
  
  //Obtener cuentas asociadas a MetaMask
  getAccounts = () => {
    const that = this;
    this.safemovService.getAccounts().
    then(function(retAccount: any) {
      console.log(retAccount);
      that.dataInit.driver = retAccount[0];
      console.log('driver.components :: getAccounts :: this.reg');
      console.log(that.dataInit);
    }).catch(function(error:any) {
      console.log(error);
    });
  }
  
  //Metodo para obtener información del viaje según tH y verificar que no sea de otra cuenta
  getInfoGeneralInitT = () => {
    this.validated=false;
    const that = this;
    console.log(this.dataInit.driver);
    this.safemovService.getTripsRelatedToAccount(that.dataInit.driver,'d').then((response:Array<{}>) =>{
      console.log('driver.components :: getTripsRelatedToAccount :: endOfTrans');
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
      });
      console.log(that.tripsHistorial);
      that.getInfoTrip();
    }); 
  }
  
  //Obtener información del viaje
  getInfoTrip(){
    const that=this;
    var current = this.tripsHistorial.find((obj) => {
      return obj["transHash" as keyof typeof obj] === that.transactionHash;
    });
    if (current!=undefined){
      that.dataInit['passenger']=current['_idPassenger' as keyof typeof current];
      that.dataInit['amount']=current['_cost' as keyof typeof current];
      that.dataInit['destination']=current['destination' as keyof typeof current];
      that.dataInit['origin']=current['origin' as keyof typeof current];
      this.validated=true;
    }
    else{
      this.transactionHash="";
      this.validated=false;
      alert('Conductor del viaje no corresponde a su dirección');
    }
    console.log(that.dataInit);
  }
  
  //Finalizar viaje
  terminar(){
    this.validateEndTrip();
  }
  
  //Validar que no se ha terminado el viaje previamente, para no pagar dos veces
  validateEndTrip(){
    const that = this;
    this.safemovService.getTripInfoFromTransaction(that.transactionHash).then((response: Array<{}>) =>{
      console.log('user.components :: getTripInfoFromTransaction :: endOfTrans');
      console.log(response);
      if (response.length==0){
        console.log('No se ha registrado el fin del viaje');
        that.endT();
      }
      else{
        alert('El viaje ya fue cobrado');
      }
    });
  }
  
  //Método para finalizar el viaje con el servicio que utiliza el contrato inteligente
  endT = () => {
    const that = this;
    var dataEnd = {
      'driver':this.dataInit.driver,
      'amount':this.dataInit.amount,
      'transactionHash':this.transactionHash
    }
    console.log(dataEnd);
    this.safemovService.endTrip(dataEnd).
    then((retAccount: any) =>{
      console.log(retAccount);
      console.log('user.components :: endT :: endOfTrans');
    });
  }
  
  //Activar interfaz de viaje actual
  act(){
    this.actual=true;
  }
  
  //Activar interfaz de historial
  historial(){
    const that=this;
    console.log(this.dataInit.driver);
    this.safemovService.getTripsRelatedToAccount(that.dataInit.driver,'d').then((response:Array<{}>) =>{
      console.log('driver.components :: getTripsRelatedToAccount :: endOfTrans');
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
      });
      console.log(that.tripsHistorial);
      that.actual=false;
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
