import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Expense } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(public firestore: AngularFirestore) { }

  getExpensesNew() {
    return this.firestore.collection('expenses').snapshotChanges();
  }

  getExpensesByAdmin(adminId, day) {
    return this.firestore.collection(`expenses`, ref => ref.where('adminId', "==", adminId).where('createdAt', "==", day)).valueChanges();
  }

  getExpensesByCobrador(cobradorId, day) {
    return this.firestore.collection(`expenses`, ref => ref.where('createdBy', "==", cobradorId).where('createdAt', "==", day)).valueChanges();
  }

  createNewExpense(expense: Expense){
    let id = this.firestore.createId();
    return this.firestore.collection('expenses').doc( id ).set(expense);
  }

  updateExpense(expense: Expense){
    return this.firestore.doc('expenses/' + expense.id).update(expense);
  }

  deleteExpense(expenseId: string){
    return  this.firestore.doc('expenses/' + expenseId).delete();
  }

  
}
