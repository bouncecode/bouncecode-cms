import { getConnection } from "typeorm";
import { connectDatabase } from "../../lib/connectDatabase";
import { UserResolver } from "./User.resolver";
import { UserCreateInput } from "./inputs/UserCreate.input";
import { UserWhereInput } from "./inputs/UserWhere.input";
import { UserUpdateInput } from "./inputs/UserUpdate.input";

const userResolver = new UserResolver();
const email = "tpnet3@gmail.com";
const password = "1234";

beforeEach(async () => {
  return await connectDatabase();
});

afterEach(async () => {
  return await getConnection().close();
});

describe("등록", () => {
  test("email, password 로 사용자 가입", async () => {
    const userCreateInput = new UserCreateInput();
    userCreateInput.email = email;
    userCreateInput.password = password;

    const createdResult = await userResolver.createUser(userCreateInput);
    expect(createdResult.email).toBe(userCreateInput.email);
  });
});

describe("조회", () => {
  beforeEach(async () => {
    const userCreateInput = new UserCreateInput();
    userCreateInput.email = email;
    userCreateInput.password = password;
    await userResolver.createUser(userCreateInput);
  });

  test("사용자 조회", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    const user = await userResolver.user(userWhereInput);
    expect(user.email).toBe(email);
  });

  test("사용자 목록 조회", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    const users = await userResolver.users(userWhereInput, 0, 10);
    expect(users.length).toBeGreaterThan(0);
  });
});

describe("수정", () => {
  beforeEach(async () => {
    const userCreateInput = new UserCreateInput();
    userCreateInput.email = email;
    userCreateInput.password = password;
    await userResolver.createUser(userCreateInput);
  });

  test("정보 수정", async () => {
    const userWhereInput = new UserWhereInput();
    userWhereInput.email = email;

    const userUpdateInput = new UserUpdateInput();
    userUpdateInput.payload = {
      foo: "baz",
    };

    await userResolver.updateUser(userWhereInput, userUpdateInput);
    const updatedUser = await userResolver.user(userWhereInput);
    expect(updatedUser.payload?.foo).toBe(userUpdateInput.payload.foo);
  });
});
