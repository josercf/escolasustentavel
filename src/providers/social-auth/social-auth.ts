import { Injectable } from '@angular/core';
import { SocialUser } from '../../../node_modules/angularx-social-login';

/*
  Generated class for the SocialAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SocialAuthProvider {

  constructor(private storage: Storage) {
    console.log('Hello SocialAuthProvider Provider');
  }

  public insert(user: SocialUser) {
    return this.save(user.id, user);
  }
 
  public update(key: string, user: SocialUser) {
    return this.save(key, user);
  }
 
  private save(key: string, user: SocialUser) {
    return this.storage.set(key, user);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }
 
  public getAll() {
 
    let users: SocialUser[] = [];
 
    return this.storage.forEach((value: SocialUser, key: string, iterationNumber: Number) => {
      let user = value;
      users.push (user);
    
    })
      .then(() => {
        return Promise.resolve(users);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}
