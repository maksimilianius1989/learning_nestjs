import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'John_Due', email: 'john_doe@gmail.com' },
    { id: 2, username: 'bob', email: 'bob@gmail.com' },
    { id: 3, username: 'daniel', email: 'daniel@gmail.com' },
  ];

  findAll() {
    return this.users;
  }
}
 