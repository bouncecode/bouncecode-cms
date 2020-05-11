import jwt from "jsonwebtoken";
import { Resolver, Mutation, Arg } from "type-graphql";
import { TokenObject } from "./Token.object";
import { UserEntity } from "../User/User.entity";
import { createHmac } from "crypto";
import { CERT_PUBLIC, CERT_PRIVATE } from "../../../env.config";
import { TokenCreateInput } from "./inputs";

const JWT_ISSUER = process.env.JWT_ISSUER || "";

@Resolver()
export class TokenResolver {
  @Mutation(() => TokenObject)
  async createToken(@Arg("data") data: TokenCreateInput) {
    const user = await UserEntity.findOne({ email: data.email });
    if (user.password !== createHmac("sha256", data.password).digest("hex")) {
      throw new Error("Invalid password.");
    }

    const refresh_token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      CERT_PRIVATE,
      {
        algorithm: "ES256",
        subject: "refresh_token",
        expiresIn: 60 * 60 * 24 * 60, // 60d
        issuer: JWT_ISSUER,
      }
    );

    const { access_token, expires_in } = await this.refreshToken(refresh_token);
    const tokenObject = new TokenObject();
    tokenObject.token = access_token;
    tokenObject.access_token = access_token;
    tokenObject.refresh_token = refresh_token;
    tokenObject.expires_in = expires_in;
    tokenObject.token_type = "Bearer";
    return tokenObject;
  }

  @Mutation(() => TokenObject)
  async refreshToken(@Arg("refreshToken") refreshToken: string) {
    const expiresIn = 60 * 60 * 2; // 2h
    const user = await jwt.verify(refreshToken, CERT_PUBLIC);
    if (user.sub !== "refresh_token") {
      throw new Error("Invalid token");
    }

    const access_token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      CERT_PRIVATE,
      {
        algorithm: "ES256",
        subject: "access_token",
        expiresIn,
        issuer: JWT_ISSUER,
      }
    );

    const tokenObject = new TokenObject();
    tokenObject.token = access_token;
    tokenObject.access_token = access_token;
    tokenObject.refresh_token = undefined;
    tokenObject.expires_in = expiresIn;
    tokenObject.token_type = "Bearer";
    return tokenObject;
  }
}
