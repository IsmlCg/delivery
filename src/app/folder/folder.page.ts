import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatabaseService } from '../firebase/database.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  private collectionName = "students";
  constructor(
  	private activatedRoute: ActivatedRoute,
  	private db: DatabaseService
  	) { 
  	db.setCollectionName( this.collectionName );
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  create() {
  	let data ={
  		name:'isml',
  		age:100
  	}
    this.db.create(data).then(resp => {
    })
      .catch(error => {
        console.log(error);
      });
  }  
}
