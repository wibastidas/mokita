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

  getCustomerById(id: string) {
    return this.firestore.doc('/customers/' + id).valueChanges();
  }

  getCustomersNew() {
    return this.firestore.collection('customers').snapshotChanges();
  }

  getCustomerByDocument(document){
    return this.firestore.collection(`customers`, ref => ref.where('document', "==", document)).snapshotChanges();
  }

  createNewCustomer(customer: Customer){
    
    return this.firestore.collection('customers').doc(this.firestore.createId()).set(customer);
  }

  updateCustomer(customer: Customer){
    //delete customer.name;

    this.firestore.doc('customers/' + customer.id).update(customer);
  }

  deleteCustomer(customerId: string){
    this.firestore.doc('customers/' + customerId).delete();
  }

  
}
