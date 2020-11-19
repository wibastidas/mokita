import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(public firestore: AngularFirestore) { }

  getCustomers() {
    //return this.firestore.collection('customers').snapshotChanges();
    return this.firestore.collection('customers').valueChanges();
  }

  getCustomerByDocument(document){
    //return this.firestore.doc<Customer>(`customers/${document}`).valueChanges(); by id
    return this.firestore.collection('customers', ref => ref.where('document','==', document )).valueChanges();
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
