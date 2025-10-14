import { Component } from '@angular/core';
import { User } from '../../services/user';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  constructor(private apiService: User) {

  }
  ngOnInit() {
    this.fetchUsers();
  }
  usersList:any;
  fetchUsers() {
    this.apiService.getUsers().subscribe(res => {
      console.log('user', res);
      this.usersList = res;
    })
  }
}
