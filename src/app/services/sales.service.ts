import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sale } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public firestore: AngularFirestore) { }

  getSales() {
    return this.firestore.collection('sales').snapshotChanges();
  }

  getSalesByCustomerId(customerId){
    return this.firestore.collection(`sales`, ref => ref.where('customerId', "==", customerId)).snapshotChanges();
  }

  createNewSale(sale: Sale){
    console.log("createNewSale", sale);
    let id = this.firestore.createId();
    return this.firestore.collection('sales').doc( id ).set(sale);
  }

  updateSale(sale: Sale){
    return this.firestore.doc('sales/' + sale.id).update(sale);
  }

  deleteSale(saleId: string){
    return  this.firestore.doc('sales/' + saleId).delete();
  }

}
