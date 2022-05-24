import { Component, OnInit } from '@angular/core';
import {SafemovService} from '../services/safemov.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [SafemovService]
})
export class UserComponent implements OnInit {

  constructor(private safemovService: SafemovService) { }

  ngOnInit(): void {
    
  }
  
  //Initial variables
  dataEnd = {
      'driver':'0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      'amount':'10',
      'transactionHash':'0x37ea1526c1857f6e8c945ca51ab5b319e5bb7d6a326112b526cb8f8999537846'
  }
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
    },
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
  holaMundo(e:String){
    console.log(e);
    this.detalle=true;
    this.trans=e;
  }
  
  configTripData(){
    this.cotizar=true;
    this.getAccounts();
    
  }
  initTrip(){
    this.initT();
    
    console.log(this.dataInit);
    
    //console.log(this.dataEnd);
    //this.endT();
  }
  getAccounts = () => {
    const that = this;
    this.safemovService.getAccounts().
    then(function(retAccount: any) {
      console.log(retAccount);
      that.dataInit.passenger = retAccount[0];
      console.log('user.components :: getAccounts :: this.reg');
      console.log(that.dataInit);
    }).catch(function(error) {
      console.log(error);
    });
  }
  
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
  
  getInfoInitT = () => {
    const that = this;
    this.safemovService.getTripsRelatedToAccount(that.dataInit.passenger,'p').then((response: any) =>{
      console.log('user.components :: getTripsRelatedToAccount :: endOfTrans');
      console.log(response);
    });
  }
  
  
  //////////////////////////////////////////////////////////////////
  endT = () => {
    const that = this;
    this.safemovService.endTrip(that.dataEnd).
    then((retAccount: any) =>{
      console.log(retAccount);
      console.log('user.components :: endT :: endOfTrans');
    });
  }
  
  
  
  getInfoEndT = () => {
    const that = this;
    this.safemovService.getTripInfoFromTransaction(that.dataEnd.transactionHash).then((response: any) =>{
      console.log('user.components :: getTripInfoFromTransaction :: endOfTrans');
      console.log(response);
    });
  }
  
  getInfoAP = () => {
    const that = this;
    this.safemovService.getAPsInfoFromTransaction(that.dataEnd.transactionHash).then((response: any) =>{
      console.log('user.components :: getAPsInfoFromTransaction :: endOfTrans');
      console.log(response);
    });
  }
  
  getTrip(e:String){
    console.log(e);
  }
}
