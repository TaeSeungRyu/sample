import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  template : '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private DataBase : AngularFirestore;
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(db : AngularFirestore) {   //모듈에서 만들어진 파이어 베이스(리얼타임 베이스가 아니라 FireStore입니다!) 접속관련 객체
    this.DataBase = db;
    this.getItem('찾고자하는컬렉션명').subscribe((res)=>{  //원하는 컬렉션에 대해서 구독행위 시작 합니다
      console.log(res);
    });
  }  

  getItem(db_name : string){
    this.itemsCollection = this.DataBase.collection<any>(db_name, (ref) =>ref);  //컬렉션에 접속 합니다
    return this.itemsCollection.valueChanges();  
  }
}