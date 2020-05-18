import { getConnection } from "typeorm";
import { connectDatabase } from "../../lib/connectDatabase";
import { UserResolver } from "./User.resolver";
import { UserCreateInput } from "./inputs/UserCreate.input";
import { UserWhereInput } from "./inputs/UserWhere.input";
import { UserUpdateInput } from "./inputs/UserUpdate.input";

beforeAll(async () => {
  return await connectDatabase();
});

afterAll(async () => {
  return await getConnection().close();
});

describe("User", () => {
  const userResolver = new UserResolver();
  const email = "test1@example.com";
  const password = "123456";
  let id = null;

  beforeAll(async () => {
    const userCreateInput = new UserCreateInput();
    userCreateInput.email = email;
    userCreateInput.password = password;
    userCreateInput.payload = { foo: "테스트" };

    const createdUser = await userResolver.createUser(userCreateInput);
    id = createdUser.id;

    expect(createdUser.id).not.toBeUndefined();
    expect(createdUser.email).toBe(userCreateInput.email);
    expect(createdUser.payload.foo).toBe(userCreateInput.payload.foo);
  });

  afterAll(async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    await userResolver.deleteUser(userWhereInput);
    const user = await userResolver.user(userWhereInput);

    expect(user).toBeUndefined();
  });

  test("user(id)", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.id = id;

    const user = await userResolver.user(userWhereInput);

    expect(user.id).toBe(id);
  });

  test("user(email)", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    const user = await userResolver.user(userWhereInput);

    expect(user.email).toBe(email);
  });

  test("users(id)", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.id = id;

    const users = await userResolver.users(userWhereInput, 0, 10);

    expect(users.length).toBeGreaterThan(0);
  });

  test("users(email)", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    const users = await userResolver.users(userWhereInput, 0, 10);

    expect(users.length).toBeGreaterThan(0);
  });

  test("updateUser(id, payload)", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.id = id;

    const userUpdateInput = new UserUpdateInput();
    userUpdateInput.payload = { foo: "baz" };

    await userResolver.updateUser(userWhereInput, userUpdateInput);
    const user = await userResolver.user(userWhereInput);

    expect(user.payload?.foo).toBe(userUpdateInput.payload.foo);
  });

  test("updateUser(email, payload)", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    const userUpdateInput = new UserUpdateInput();
    userUpdateInput.payload = { foo: "baz" };

    await userResolver.updateUser(userWhereInput, userUpdateInput);
    const user = await userResolver.user(userWhereInput);

    expect(user.payload?.foo).toBe(userUpdateInput.payload.foo);
  });
});
