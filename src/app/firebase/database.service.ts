import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

// environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  collectionName = '';
  constructor( 
    private firestore: AngularFirestore
     ) {

  }
  
  addArray( datas ){
    console.log(datas);
    for( let value of datas )
    {
      this.create( value );
      console.log('value');
      console.log(value);
    }
  }

  all() {
    return this.firestore.collection( this.collectionName ).snapshotChanges();
  }

  
  // Create
  create( data ) {
    data.createdate = this.getDateTime();
    data.id = this.uuid();
    return this.firestore.collection( this.collectionName ).add( data );
  }

  delete( id ) {
    this.firestore.doc( this.collectionName  + '/' +  id ).delete();
  }

  find( username, password ){
    return this.firestore.collection(
      this.collectionName,
      ref => ref.where( "username", "==", username ).
                 where( "password", "==", password )
      ).snapshotChanges();
  }

  filterIn( field ,operator, value ){
    console.log( 'col '+this.collectionName )
    return this.firestore.collection( 
                      this.collectionName, 
                      ref => ref.where( 
                                field, operator, value
                              )
                        ).snapshotChanges();
  
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

  /**
  * name string 
  */
  setCollectionName( name ){
    if ( name ) { 
      this.collectionName =  name;
    }  
  }

  update( id, data ) {
    this.firestore.doc( this.collectionName  + '/' +  id).update(data );
  }

  uuid(){
    var date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var random = ( date + Math.random()*16 )%16 | 0;
        date = Math.floor( date/16 );
        return (c=='x' ? random :(random&0x3|0x8)).toString(16);
    });
  }
}
// https://www.freakyjolly.com/ionic-firebase-crud-operations/#.XtliFRYo9Ng