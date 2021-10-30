/**
 * 데이터베이스에 연결되었을 때 실행하는 파일입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {Connection} from 'typeorm';
import {Seeder, Factory} from 'typeorm-seeding';
import {UserEntity} from '../entities/User.entity';
import {EMAIL, PASSWORD} from '../../../../config/admin.config';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const admin = await UserEntity.createQueryBuilder('user')
      .where('user.email = :email', {email: EMAIL})
      .getOne();

    if (!admin) {
      await UserEntity.create({
        email: EMAIL,
        password: PASSWORD,
        isAdmin: true,
      }).save();
    }
  }
}
