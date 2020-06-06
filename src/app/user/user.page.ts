import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { DatabaseService } from '../firebase/database.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user = {};
  isSubmitted = false;
  collectionName = 'users'
  constructor( private db: DatabaseService ) { 
  	this.user = {
  		address : 'Santa Cruz Bolivia',
  		enabled : false,
  		email : '',
  		login_number : 0,
  		name : 'Ismael Cardenas Gomez',
  		phone : '0834205311',
  		password : 'icardenas',
  		remark : 'this is my delivery account',
  		username : 'isml08',
  		userface : '',
  		createdate : '',
  		delete : false
  	};
  	db.setCollectionName( this.collectionName );
  }

  ngOnInit() {
  }

  logForm(){

  }

  onSubmit(myForm: NgForm) {
    this.isSubmitted = true;
    console.log('user');
    console.log( this.user);
  }

  create( ) {
  	
  	var DateObj = this.getDateTime();
  	console.log( DateObj);
  	// this.user.createdate = DateObj.getFullYear() + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + DateObj.getDate()).slice(-2);

  	// console.log(this.user);
    // this.db.create( this.user ).then(resp => {

    // })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  getDateTime(){
  	var date = new Date();
	return  date.getFullYear() + " " +
			("00" + (date.getMonth() + 1)).slice(-2) + "-" +
			("00" + date.getDate()).slice(-2) + "-" +
			("00" + date.getHours()).slice(-2) + ":" +
			("00" + date.getMinutes()).slice(-2) + ":" +
			("00" + date.getSeconds()).slice(-2);

  }
}
