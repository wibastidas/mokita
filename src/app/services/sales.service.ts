import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Sale } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(public firestore: AngularFirestore) { }

  getSales() {
    return this.firestore.collection('sales').snapshotChanges();
  }

  getSaleById(saleId: string) {
    return this.firestore.doc('/sales/' + saleId).valueChanges({idField: 'id'}).pipe(
        map((response:any) => ({...response, abonos: response.abonos.reverse(), porcentajePagado: this.calcularPorcentaje(response.montoConInteres, response.montoConInteres - response.saldo)}))
      );
  }

  calcularPorcentaje(montoConInteres, montoPagado){
    return (montoPagado / montoConInteres)*100 ;
  }

  getSalesByCustomerId(customerId){
    return this.firestore.collection(`sales`, ref => ref.where('customerId', "==", customerId)).snapshotChanges();
  }

  createNewSale(sale: Sale){
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
