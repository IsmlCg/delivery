import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
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
			id : 0,
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
	collectionName = 'users';
	constructor( 
		private db: DatabaseService,
		private router: Router,
		public loadingController: LoadingController,
		public alertCtrl: AlertController
		) { 
		db.setCollectionName( this.collectionName );
	}

	ngOnInit() {
	}

	create( ) {
		
	this.db.create( this.user ).then(resp => {
	  	let data ={
	  		username : this.user.username,
	  		password : this.user.password
	  	};
		this.goLoginPage( data );    	
	}).catch( error => {
	    console.log(error);
	});

	}

	goLoginPage( data = null ){
		if ( data ) {
			this.router.navigate( [ '/login' , { user: JSON.stringify( data ) } ]);
		}else{
	  	this.router.navigate( [ '/login' ] );
		}

	}

	async presentLoading() {
		const loading = await this.loadingController.create({
		  cssClass: 'my-custom-class',
		  message: 'Please wait...!',
		  duration: 1000
		});
		await loading.present();

		const { role, data } = await loading.onDidDismiss();
		this.goLoginPage();
		console.log('Loading dismissed!');
	}

    async presentConfirm() {
	  const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'confirm that your details are <strong>correct</strong>!!!',
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
