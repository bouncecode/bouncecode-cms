/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {getConnection} from 'typeorm';
import {connectDatabase} from '../../../lib/connectDatabase';
import {TokenResolver} from './Token.resolver';
import {UserResolver} from './User.resolver';
import {UserCreateInput} from '../inputs/UserCreate.input';
import {UserWhereInput} from '../inputs/UserWhere.input';
import {TokenCreateInput} from '../inputs/TokenCreate.input';
import {parseAuthHeader} from '../../../lib/parseAuthHeader';

const userResolver = new UserResolver();
const tokenResolver = new TokenResolver();
const email = 'test_' + Math.random() + '@example.com';
const password = '123456_' + Math.random();
let id = null;

beforeAll(async () => {
  return await connectDatabase();
});

afterAll(async () => {
  return await getConnection().close();
});

beforeEach(async () => {
  const userCreateInput = new UserCreateInput();
  userCreateInput.email = email;
  userCreateInput.password = password;
  userCreateInput.payload = {foo: '테스트'};

  const createdUser = await userResolver.createUser(userCreateInput);
  id = createdUser.id;

  expect(createdUser.id).not.toBeUndefined();
  expect(createdUser.email).toBe(userCreateInput.email);
  expect(createdUser.payload.foo).toBe(userCreateInput.payload.foo);
});

afterEach(async () => {
  const userWhereInput = new UserWhereInput();
  userWhereInput.email = email;

  await userResolver.deleteUser(userWhereInput);
  const user = await userResolver.user(userWhereInput);

  expect(user).toBeUndefined();
});

describe('액세스 토큰', () => {
  it('액세스 토큰을 발급받습니다.', async () => {
    const tokenCreateInput = new TokenCreateInput();
    tokenCreateInput.email = email;
    tokenCreateInput.password = password;

    const tokenObject = await tokenResolver.createToken(tokenCreateInput);
    const jwt = await parseAuthHeader(tokenObject.access_token);
    expect(jwt?.email).toBe(tokenCreateInput.email);
  });
});

describe('리프레시 토큰', () => {
  it('액세스 토큰을 재발급 받습니다.', async () => {
    const tokenCreateInput = new TokenCreateInput();
    tokenCreateInput.email = email;
    tokenCreateInput.password = password;

    const accessTokenObject = await tokenResolver.createToken(tokenCreateInput);
    const accessTokenJwt = await parseAuthHeader(
      accessTokenObject.access_token,
    );

    const refreshTokenObject = await tokenResolver.refreshToken(
      accessTokenObject.refresh_token,
    );
    const newAccessTokenJwt = await parseAuthHeader(
      refreshTokenObject.access_token,
    );

    expect(newAccessTokenJwt?.email).toBe(tokenCreateInput.email);
  });
});
