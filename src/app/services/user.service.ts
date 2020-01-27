import {User} from '../models/User.model';
import {Subject} from 'rxjs';

export class UserService{
  private users: User[] = [
    {
      firstName: 'Adil',
      lastName: 'Nait Daoud',
      email: 'adil@gmail.com',
      drinkPreference: 'Hawaii',
      hobbies: ['coder', 'Football']
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers(){
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User){
    this.users.push(user);
    this.emitUsers();
  }
}
