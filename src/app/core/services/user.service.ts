import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageKey = 'users';

  constructor() {}

  getUsers(): Observable<User[]> {
    const users = localStorage.getItem(this.localStorageKey);
    return of(users ? JSON.parse(users) : []);
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.getUsers().pipe(map((users) => users.find((user) => user.id === id)));
  }

  addUser(user: User): Observable<User> {
    const users = this.getUsersFromStorage();
    users.push(user);
    this.saveUsersToStorage(users);
    return of(user);
  }

  updateUser(user: User): Observable<User> {
    const users = this.getUsersFromStorage();
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.saveUsersToStorage(users);
    }
    return of(user);
  }

  deleteUser(id: number): Observable<boolean> {
    let users = this.getUsersFromStorage();
    users = users.filter((user) => user.id !== id);
    this.saveUsersToStorage(users);
    return of(true);
  }

  // Helper methods to interact with localStorage
  private getUsersFromStorage(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  private saveUsersToStorage(users: User[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
}
