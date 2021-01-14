import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/interfaces';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, 
              private afs: AngularFirestore, 
              private alertService: AlertService) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);

    }
  }

  async register(email: string, password: string, isAdmin: boolean): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {

      let message: string;
      if (error.code == 'auth/weak-password') {
        message = 'La contraseña debe tener al menos 6 caracteres'
      } else if (error.code == 'auth/email-already-in-use') {
        message = 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.'
      } else {
        message = error.message;
      }
      this.alertService.presentAlert("Error!", message, ['Ok'])

    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
      let message: string;
      if (error.code == 'auth/wrong-password') {
        message = 'La contraseña no es válida o el usuario no tiene contraseña.'
      } else {
        message = error.message;
      }
      this.alertService.presentAlert("Error!", message, ['Ok'])

    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
      this.alertService.presentAlert("Error!", error.message, ['Ok'])

    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
      this.alertService.presentAlert("Error!", error.message, ['Ok'])

    }
  }

  private updateUserData(user: User) {
    console.log("updateUserData: ", user);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      roles: {
        admin: true
      }
      // roles: {
      //   cobrador: true
      // }
    };

    return userRef.set(data, { merge: true });
  }

  isUserAdmin(userUid){
    return this.afs.doc<User>(`users/${userUid}`).valueChanges();
  }


}