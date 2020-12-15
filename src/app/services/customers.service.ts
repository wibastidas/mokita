import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Customer } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(public firestore: AngularFirestore) { }

  // getCustomers() {
  //   return this.firestore.collection('customers').valueChanges();
  // }

  // getCustomerById(id: string) {
  //   return this.firestore.doc('/customers/' + id).valueChanges();
  // }

  getCustomersNew() {
    return this.firestore.collection('customers').snapshotChanges();
  }

  getCustomerByDocument(document){
    return this.firestore.collection(`customers`, ref => ref.where('document', "==", document)).snapshotChanges();
  }

  createNewCustomer(customer: Customer){
    
    let id = this.firestore.createId();
    // customer.id = this.firestore.createId();
    // console.log("customer new: ", customer)
    return this.firestore.collection('customers').doc( id ).set(customer);
  }

  updateCustomer(customer: Customer){
    //delete customer.name;

    return this.firestore.doc('customers/' + customer.id).update(customer);
  }

  deleteCustomer(customerId: string){
    return  this.firestore.doc('customers/' + customerId).delete();
  }

  
}
