import { getConnection } from "typeorm";
import { connectDatabase } from "../../lib/connectDatabase";
import { TokenResolver } from "./Token.resolver";
import { UserResolver } from "../User/User.resolver";
import { UserCreateInput } from "../User/inputs/UserCreate.input";
import { UserWhereInput } from "../User/inputs/UserWhere.input";
import { TokenCreateInput } from "./inputs/TokenCreate.input";
import { parseAuthHeader } from "../../lib/parseAuthHeader";

beforeAll(async () => {
  return await connectDatabase();
});

afterAll(async () => {
  return await getConnection().close();
});

describe("User", () => {
  const userResolver = new UserResolver();
  const tokenResolver = new TokenResolver();
  const email = "test2@example.com";
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

  test("signin(email, password)", async () => {
    const tokenCreateInput = new TokenCreateInput();
    tokenCreateInput.email = email;
    tokenCreateInput.password = password;

    const tokenObject = await tokenResolver.createToken(tokenCreateInput);
    const jwt = await parseAuthHeader(tokenObject.access_token);
    expect(jwt?.email).toBe(tokenCreateInput.email);
  });

  test("refreshToken(accessToken)", async () => {
    const tokenCreateInput = new TokenCreateInput();
    tokenCreateInput.email = email;
    tokenCreateInput.password = password;

    const accessTokenObject = await tokenResolver.createToken(tokenCreateInput);
    const accessTokenJwt = await parseAuthHeader(
      accessTokenObject.access_token
    );

    const refreshTokenObject = await tokenResolver.refreshToken(
      accessTokenObject.refresh_token
    );
    const newAccessTokenJwt = await parseAuthHeader(
      refreshTokenObject.access_token
    );

    expect(newAccessTokenJwt?.email).toBe(tokenCreateInput.email);
  });
});
