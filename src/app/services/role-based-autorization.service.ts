import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedAutorizationService {

  constructor() { }

    ///// Role-based Authorization for Users //////

    canReadUser(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }

    canCreateUser(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    canEditUser(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    canDeleteUser(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    ///// Role-based Authorization for Customers //////

    canReadCustomer(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }

    canCreateCustomer(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }
  
    canEditCustomer(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }
  
    canDeleteCustomer(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    ///// Role-based Authorization for Expenses //////

    canReadExpense(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }

    canCreateExpense(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }
  
    canEditExpense(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    canDeleteExpense(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }

    ///// Role-based Authorization for Sales //////

    canReadSale(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }

    canCreateSale(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    canEditSale(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    canDeleteSale(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }

    ///// Role-based Authorization for Abonos //////

    canReadAbono(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }

    canCreateAbono(user: User): boolean {
      const allowed = ['admin', 'cobrador']
      return this.checkAuthorization(user, allowed)
    }
  
    canEditAbono(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    canDeleteAbono(user: User): boolean {
      const allowed = ['admin']
      return this.checkAuthorization(user, allowed)
    }
  
    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
      if (!user) return false
      for (const role of allowedRoles) {
        if ( user.roles[role] ) {
          return true
        }
      }
      return false
    }
    
}
