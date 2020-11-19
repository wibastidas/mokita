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
    return this.firestore.collection('customers').snapshotChanges();
  }

  getCustomerByDocument(document){
    //return this.firestore.doc<Customer>(`customers/${document}`).valueChanges(); by id
    //return this.firestore.collection('customers', ref => ref.where('document','==', document )).ref.get()



  
    // return this.firestore.collection('customers', ref => ref.where('document','==', document ))
    // .get()
    // .pipe(
    // map((res) => res.docs.map(d => d.data()),
    // take(1)))
  

    return this.firestore.collection(`customers`, ref => ref.where('document', "==", document)).snapshotChanges();
    
    // .subscribe(res => {
    //   console.log("res: ", res)
    //   if (res.length > 0)
    //       {
    //       console.log("Match found.");
    //       }
    //       else
    //       {
    //       console.log("Does not exist.");
    //       }
    //   });

    // return this.firestore.collection('customers', ref => ref.where('document','==', document ))
    //         .doc('m9A9Bg6H3DniS2Ckjb2O')
    //         .ref
    //         .get().then(function(doc) {
    //             if (doc.exists) {
    //                 console.log("Document data:", doc.data());
    //             } else {
    //                 console.log("No such document!");
    //             }
    //         }).catch(function(error) {
    //             console.log("Error getting document:", error);
    //         });

    
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
