import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DatabaseService } from '../firebase/database.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	user = {
  		password : '',
  		username : ''
  	};
  	id = [];
  	collectionName = 'users'
	constructor( 
		private route: ActivatedRoute,
    	private router: Router,
    	private db: DatabaseService,
    	public app : AppComponent
	) { 
		db.setCollectionName( this.collectionName );
	}

	ngOnInit() {
		if ( this.route.snapshot.paramMap.get( 'user' ) ) {
			this.user = JSON.parse( this.route.snapshot.paramMap.get( 'user' ) );
		}
	}

	login(){
		this.db.find( this.user.username, this.user.password ).subscribe( data => {
	      this.id = data.map( e => {
	        return e.payload.doc.id;
	      });
	      if ( this.id.length == 1 ) 
	      {

	      }

	    });
	}


	goToRegisterPage(){
	  	this.router.navigate( [ '/user' ] );
	  	console.log( this.app.labels );
	  	this.app.labels =[ 'demo','demo1' ];
	  	this.app.ishidden = false;
    }

}

