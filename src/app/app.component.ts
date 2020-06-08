import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DatabaseService } from './firebase/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  collectionName = 'menu';

  public ishidden = true;

  public appPages = [/*
    {
      id:'',
      title: 'Register',
      url: '/user',
      icon: 'mail',
      createdate:'',
      parent_id:'',
      delete : false

    },
    {
      id:'',
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paperplane',
      createdate:'',
      parent_id:'',
      delete : false

    },
    {
      id:'',
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart',
      createdate:'',
      parent_id:'',
      delete : false

    },
    {
      id:'',
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive',
      createdate:'',
      parent_id:'',
      delete : false

    },
    {
      id:'',
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash',
      createdate:'',
      parent_id:'',
      delete : false

    },
    {
      id:'',
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning',
      createdate:'',
      parent_id:'',
      delete : false

    }
  */];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private db: DatabaseService
  ) {
    this.initializeApp();
    db.setCollectionName( this.collectionName );

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  ngOnInit() {
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex( page => 
        page.title.toLowerCase() === path.toLowerCase()
        );
    }
    
  }

  initMenu( user_id, _db ){
    
    let role_ids;
    _db.setCollectionName( 'users_role' );

    _db.filter( 'user_id', 'in', user_id ).subscribe( data => {
      role_ids = data.map( e => {
        return e.payload.doc.data()[ 'role_id' ];
      })
    });

    let id_role;
    _db.setCollectionName( 'role' );

    _db.filter( 'id', 'in', role_ids ).subscribe( data => {
      id_role = data.map( e => {
        return e.payload.doc.data()[ 'role_id' ];
      })
    });

    let menu_ids;
    _db.setCollectionName( 'menu_role' );

    _db.filter( 'role_id', 'in', id_role ).subscribe( data => {
      menu_ids = data.map( e => {
        return e.payload.doc.data()[ 'role_id' ];
      })
    });


    _db.setCollectionName( 'menu' );
    _db.filter( 'id', 'in', menu_ids ).subscribe( data => {
      this.appPages = data.map( e => {
        return {
          title : e.payload.doc.data()[ 'title' ],
          path : e.payload.doc.data()[ 'path' ],
          url  : e.payload.doc.data()[ 'url' ],
          parent_id  : e.payload.doc.data()[ 'parent_id' ],
          icon : e.payload.doc.data()[ 'icon' ],
        };
      })

    });
  }

}
