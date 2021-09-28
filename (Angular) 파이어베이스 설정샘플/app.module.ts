import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';  //파이어 베이스 기본 객체
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';

const fireEnvironment = {
  production: true,
  firebase: {
      /**파이어 베이스 저장소 만들 때 생성된 json 내용**/
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(fireEnvironment.firebase, '/'),   //파이어 베이스 모듈 사용
    AngularFirestoreModule,  //파이어베이스 데이터베이스와 관련된 모듈 사용
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }