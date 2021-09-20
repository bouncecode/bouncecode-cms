/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.User.entities
 */

import {UserEntity} from './User.entity';
import {connectDatabase} from '../../../lib/connectDatabase';
import {getConnection} from 'typeorm';

const email = 'test_' + Math.random() + '@example.com';
const password = '123456_' + Math.random();

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

beforeEach(async () => {
  await UserEntity.create({email, password}).save();
});

afterEach(async () => {
  await UserEntity.delete({email});
});

describe('비밀번호 저장', () => {
  it('비밀번호를 암호화하여 저장해야합니다.', async () => {
    const user = await UserEntity.findOne({email});
    expect(user.password).not.toBe(password);
  });
});
