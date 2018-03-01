import { Component } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'scanApp';

  dboperators: Observable<any[]>;
  dbstations: Observable<any[]>;
  public errormsg:string;

  @ViewChild('scancodex') element: ElementRef;

  constructor(private db: AngularFirestore) {

    this.dboperators = db.collection('operators', db => db.orderBy('id')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data };
      })});
    this.dbstations = db.collection('stations', db => db.orderBy('id')).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return { uid, ...data };
      })});
    this.errormsg = "";
  };

  deleteOperator(operator) {
    console.log('operator DOC id: '+operator);
    this.db.collection("operators").doc(operator).delete().catch(function(error){
      this.errormsg="Error deleting Operator :"+error;
      console.error(this.errormsg);
    });
    this.element.nativeElement.focus();
  }

  deleteStation(station) {
    console.log('station DOC id: '+station);
    this.db.collection("stations").doc(station).delete().catch(function(error){
      this.errormsg="Error deleting Station :"+error;
      console.error(this.errormsg);
    });
    this.element.nativeElement.focus();
    }

    returnFocus() {
      this.element.nativeElement.focus();
    }

  setFocus(element) {
    console.log('setfocus');
  }

  error(){
    if (!this.errormsg) {this.errormsg=""};
    return this.errormsg;
  }

  ngAfterViewInit(){
    ///onElement.focus();
    this.element.nativeElement.focus();
    console.log('input xxxx',this.element);
  }

}
