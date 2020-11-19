import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(public firestore: AngularFirestore) { }

  getCustomers() {
    return this.firestore.collection('customers').valueChanges();
  }

  getCustomerByDocument(document){
    return this.firestore.collection(`customers`, ref => ref.where('document', "==", document)).snapshotChanges();
  }

  createNewCustomer(customer: Customer){
    return this.firestore.collection('customers').add(customer);
  }

  updateCustomer(customer: Customer){
    delete customer.name;
    this.firestore.doc('customers/' + customer.name).update(customer);
  }

  deleteCustomer(customerId: string){
    this.firestore.doc('customers/' + customerId).delete();
  }

  
}
