import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { DatabaseService } from '../firebase/database.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user = {
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
  isSubmitted = false;
  collectionName = 'users'
  constructor( 
  	private db: DatabaseService,
  	public alertCtrl: AlertController
  	) { 
  	db.setCollectionName( this.collectionName );
  }

  ngOnInit() {
  }

  create( ) {
  	
  	this.user.createdate = this.getDateTime();

    this.db.create( this.user ).then(resp => {

    }).catch( error => {
        console.log(error);
    });
  }

  getDateTime(){
  	var date = new Date();
	return  date.getFullYear() + "-" +
			("00" + (date.getMonth() + 1)).slice(-2) + "-" +
			("00" + date.getDate()).slice(-2) + " " +
			("00" + date.getHours()).slice(-2) + ":" +
			("00" + date.getMinutes()).slice(-2) + ":" +
			("00" + date.getSeconds()).slice(-2);

  }

    async presentConfirm() {
	  const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.create();
          }
        }
      ]
    });

    await alert.present();
	}
}
