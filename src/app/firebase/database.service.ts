import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

// environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  collectionName = 'users';
  constructor( 
  	private firestore: AngularFirestore
  	 ) {

  }
  /**
  * name string	
  */
  setCollectionName( name ){
  	if ( name ) { 
	  	this.collectionName =  name;
  	}
  }

  all() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  // Create
  create( data ) {
    return this.firestore.collection(this.collectionName).add( data );
  }

  delete( id ) {
    this.firestore.doc(this.collectionName + '/' +  id ).delete();
  }

  update( id, data ) {
    this.firestore.doc(this.collectionName + '/' +  id).update(data );
  }
}
// https://www.freakyjolly.com/ionic-firebase-crud-operations/#.XtliFRYo9Ng