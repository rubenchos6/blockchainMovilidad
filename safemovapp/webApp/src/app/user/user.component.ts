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
  dataInit = {
      'driver':'0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      'passenger':'',
      'vehicle':'0xf17f52151EbEF6C7334FAD080c5704D77216b732',
      'amount':'10',
      'origin':'testOrigin1',
      'destination':'testDestination1',
      'timestamp':'testHour1'
  }
  dataEnd = {
      'driver':'0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      'amount':'10',
      'transactionHash':'0x37ea1526c1857f6e8c945ca51ab5b319e5bb7d6a326112b526cb8f8999537846'
  }
  costo = 58;
  cotizar=false;
  tomarViaje=false;
  actual=true;
  drivers=[
    {
      "id": 0,
      "name": "Gina",
      "picture": "images/Gina.jpeg",
      "nTrips": "+500",
      "calif": "4.9" 
    },
    {
      "id": 1,
      "name": "Collins",
      "picture": "images/Collins.jpeg",
      "nTrips": "+100",
      "calif": "4.3"
    },
    {
      "id": 2,
      "name": "Melissa",
      "picture": "images/Melissa.jpeg",
      "nTrips": "+200",
      "calif": "4.7"
    },
    {
      "id": 3,
      "name": "Jean",
      "picture": "images/Jean.jpeg",
      "nTrips": "+300",
      "calif": "4.4"
    },
    {
      "id": 4,
      "name": "Elvia",
      "picture": "images/Elvia.jpeg",
      "nTrips": "+50",
      "calif": "4.0"
    },
    {
      "id": 5,
      "name": "Latisha",
      "picture": "images/Latisha.jpeg",
      "nTrips": "+450",
      "calif": "4.8"
    }
  ];
  driver=this.drivers[0];
  transacciones=[
    {"transHash":"asdfghj",
      "timestamp":"20-15-2022"
    },
    {"transHash":"asdfghj",
      "timestamp":"20-15-2022"
    }
  ]
  configTripData(){
    this.cotizar=true;
    this.getAccounts();
    console.log(this.dataInit);
  }
  initTrip(){
    this.tomarViaje=true;
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
    const that = this;
    this.safemovService.initTrip(that.dataInit).then((response: any) =>{
      console.log('user.components :: initT :: endOfTrans');
      console.log(response);
    });
  }
  
  endT = () => {
    const that = this;
    this.safemovService.endTrip(that.dataEnd).
    then((retAccount: any) =>{
      console.log(retAccount);
      console.log('user.components :: endT :: endOfTrans');
    });
  }
  
  getInfoInitT = () => {
    const that = this;
    this.safemovService.getTripsRelatedToAccount(that.dataInit.passenger,'p').then((response: any) =>{
      console.log('user.components :: getTripsRelatedToAccount :: endOfTrans');
      console.log(response);
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
