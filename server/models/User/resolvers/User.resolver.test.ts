/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.User.resolvers
 */

import { getConnection } from "typeorm";
import { connectDatabase } from "../../../lib/connectDatabase";
import { UserResolver } from "./User.resolver";
import { UserCreateInput } from "../inputs/UserCreate.input";
import { UserWhereInput } from "../inputs/UserWhere.input";
import { UserUpdateInput } from "../inputs/UserUpdate.input";

const userResolver = new UserResolver();
const email = "test_" + Math.random() + "@example.com";
const password = "123456_" + Math.random();
let id = null;

beforeAll(async () => {
  return await connectDatabase();
});

afterAll(async () => {
  return await getConnection().close();
});

describe("회원 가입", () => {
  it("이메일, 비밀번호로 회원가입합니다.", async () => {
    const userCreateInput = new UserCreateInput();
    userCreateInput.email = email;
    userCreateInput.password = password;
    userCreateInput.payload = { foo: "테스트" };

    const createdUser = await userResolver.createUser(userCreateInput);
    id = createdUser.id;

    expect(createdUser.id).toBeTruthy();
    expect(createdUser.email).toBe(userCreateInput.email);
    expect(createdUser.payload.foo).toBe(userCreateInput.payload.foo);
  });
});

describe("회원 정보 조회", () => {
  it("사용자 정보를 조회합니다.", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.id = id;

    const user = await userResolver.user(userWhereInput);

    expect(user.id).toBe(id);
  });

  it("모든 사용자의 목록을 가져옵니다.", async () => {
    const userWhereInput = new UserWhereInput();

    const users = await userResolver.users(userWhereInput, 0, 10);

    expect(users.length).toBeTruthy();
  });
});

describe("회원 정보 수정", () => {
  it("사용자의 정보를 수정합니다.", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.id = id;

    const userUpdateInput = new UserUpdateInput();
    userUpdateInput.payload = { foo: "baz" };

    await userResolver.updateUser(userWhereInput, userUpdateInput);
    const user = await userResolver.user(userWhereInput);

    expect(user.payload?.foo).toBe(userUpdateInput.payload.foo);
  });
});

describe("회원 정보 삭제", () => {
  it("사용자를 삭제합니다.", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    await userResolver.deleteUser(userWhereInput);
    const user = await userResolver.user(userWhereInput);

    expect(user).not.toBeTruthy();
  });
});
