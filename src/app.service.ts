import { Injectable } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class AppService {
  getHello() {
    return {message: 'Test data!'};
  }

  test() {
    console.log();
  }
}
