import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { uniq } from 'lodash';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Customer } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(public firestore: AngularFirestore) { }

  // getCustomers() {
  //   return this.firestore.collection('customers').valueChanges();
  // }

  getCustomerById(id: string) {
    return this.firestore.doc('/customers/' + id).valueChanges();
  }

  getCustomersNew() {
    return this.firestore.collection('customers').snapshotChanges();
  }

  getCustomersByAdmin(adminId) {
    return this.firestore.collection(`customers`, ref => ref.where('adminId', "==", adminId)).valueChanges().pipe(
      map(customers => {
        return customers.sort((a: any, b: any) => {
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
      })
    )
  }

  getCustomersByCobrador(cobradorId) {
    return this.firestore.collection(`customers`, ref => ref.where('cobradorId', "==", cobradorId)).valueChanges();
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

  getVendedoresByAdmin(adminId: string) {
    return this.firestore.collection(`users`, ref => ref.where('createdBy', "==", adminId)).snapshotChanges();
  }

  getSalesByCustomerId(customerId){
    return this.firestore.collection(`sales`, ref => ref.where('customerId', "==", customerId).where('estado', "==", 'Activo')).snapshotChanges();
  }

  getSalesActive(adminId) {
    return this.firestore.collection(`customers`, ref => ref.where('adminId', "==", adminId)).snapshotChanges();
  }

  getSalesAndCustomersByAdmin(adminId){

    return this.firestore.collection(`customers`, ref => ref.where('adminId', "==", adminId)).valueChanges()
    .pipe(
      switchMap(customers => {
        const customerIds = uniq(customers.map((bp:any) => bp.id))

        return combineLatest([ 
          of(customers),
          combineLatest( 
            customerIds.map((customerId) =>
              this.firestore.collection(`sales`, ref => ref.where('customerId', "==", customerId).where('estado', "==", 'Activo')).valueChanges().pipe(
                map(sales => {
                  if (sales && sales[0]) return  sales[0]
                })
              )
            )
          )
        ])
      }),
      map(([customers, sales]) => {

        let customersSort = customers.sort((a: any, b: any) => {
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })


        return customersSort.map((customer: any) => {
          return {
            ...customer,
           sale: sales.find((a:any) => a && a.customerId === customer.id)
          }
        })
      })
    )

  }

  getSalesAndCustomersByCobrador(cobradorId){

    return this.firestore.collection(`customers`, ref => ref.where('cobradorId', "==", cobradorId)).valueChanges()
    .pipe(
      switchMap(customers => {
        const customerIds = uniq(customers.map((bp:any) => bp.id))

        return combineLatest([ 
          of(customers),
          combineLatest( 
            customerIds.map((customerId) =>
              this.firestore.collection(`sales`, ref => ref.where('customerId', "==", customerId).where('estado', "==", 'Activo')).valueChanges().pipe(
                map(sales => {
                  if (sales && sales[0]) return  sales[0]
                })
              )
            )
          )
        ])
      }),
      map(([customers, sales]) => {

        let customersSort = customers.sort((a: any, b: any) => {
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })


        return customersSort.map((customer: any) => {
          return {
            ...customer,
           sale: sales.find((a:any) => a && a.customerId === customer.id)
          }
        })
      })
    )

  }



  
}
