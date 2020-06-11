import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

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

  	async loading() {
		this.login();
		const loading = await this.loadingController.create({
		  cssClass: 'my-custom-class',
		  message: 'Please wait...!',
		  duration: 1000
		});
		await loading.present();

		const { role, data } = await loading.onDidDismiss();
		console.log('Loading dismissed!');
	}

	constructor( 
		private route: ActivatedRoute,
    	private router: Router,
    	private db: DatabaseService,
    	public loadingController: LoadingController,
    	public app : AppComponent
	) { 
		db.setCollectionName( this.collectionName );
	}

	ngOnInit() {
		if ( this.route.snapshot.paramMap.get( 'user' ) ) {
			this.user = JSON.parse( this.route.snapshot.paramMap.get( 'user' ) );
		}
		this.app.ishidden = true;
	}

	login(){
		this.db.find( this.user.username, this.user.password ).subscribe( data => {
	      this.id = data.map( e => {
	        return e.payload.doc.data()[ 'id' ];
	      });

	      if ( this.id.length == 1 ) 
	      {
	      	this.initMenu( this.id );
	    
	      }else{
	      	console.log( 'error login' );
	      }
	    });
	}

	goToRegisterPage( url ){
		url = ( url )? url:'/user';
	  	this.router.navigate( [ url ] );
    }

    initMenu( user_id ){
		
		console.log(user_id[0]);    
	    let role_ids =[];
	    this.db.setCollectionName( 'users_role' );

	    this.db.filterIn( 'user_id', 'in', user_id ).subscribe( async data => {
	        role_ids = data.map( e => {
		        return e.payload.doc.data()[ 'role_id' ];
		    })
		    // console.log('users_role')
		    console.log(role_ids)
	       
		    this.db.setCollectionName( 'role' );

		    this.db.filterIn( 'id', 'in', role_ids ).subscribe( data => {
		    	let id_role =[];
		       	id_role = data.map( e => {
		        	return e.payload.doc.data()[ 'id' ];
		      	})
			    // console.log('id_role')
			    console.log(id_role)
			    let menu_ids;
			    this.db.setCollectionName( 'menu_role' );

			    this.db.filterIn( 'role_id', 'in', id_role ).subscribe( data => {
					menu_ids = data.map( e => {
						return e.payload.doc.data()[ 'menu_id' ];
					})
				    console.log(menu_ids)
				    this.db.setCollectionName( 'menu' );
				    this.db.filterIn( 'id', 'in', menu_ids ).subscribe( data => {
				      this.app.appPages = data.map( e => {
				        return {
				          title : e.payload.doc.data()[ 'title' ],
				          path : e.payload.doc.data()[ 'path' ],
				          url  : e.payload.doc.data()[ 'url' ],
				          parent_id  : e.payload.doc.data()[ 'parent_id' ],
				          icon : e.payload.doc.data()[ 'icon' ],
				        };
				      })
				      this.app.ishidden = false;
				      this.goToRegisterPage( '/folder/Welcome' );
		    		});
			    });
		    });
	    });




    }

}

