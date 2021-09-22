/**
 * Token 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.User.resolvers
 * @preferred
 */

import jwt from 'jsonwebtoken';
import {Resolver, Mutation, Arg} from 'type-graphql';
import {TokenObject} from '../objects/Token.object';
import {UserEntity} from '../entities/User.entity';
import {CERT_PUBLIC, CERT_PRIVATE} from '../../../../env.config';
import {TokenCreateInput} from '../inputs/TokenCreate.input';
import bcrypt from 'bcrypt';

const JWT_ISSUER = process.env.JWT_ISSUER || '';

/**
 * 사용자의 요청을 처리하기위한 Resolver 입니다.
 *
 * @author BounceCode, Inc.
 */
@Resolver()
export class TokenResolver {
  /**
   * 새로운 토큰을 만듭니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => TokenObject)
  async createToken(@Arg('data') data: TokenCreateInput) {
    const user = await UserEntity.findOne({email: data.email});

    const matched = await bcrypt.compare(data.password, user.passwordEncrypted);
    if (!matched) {
      throw new Error('Invalid password.');
    }

    const refresh_token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      CERT_PRIVATE,
      {
        algorithm: 'ES256',
        subject: 'refresh_token',
        expiresIn: 60 * 60 * 24 * 60, // 60d
        issuer: JWT_ISSUER,
      },
    );

    const {access_token, expires_in} = await this.refreshToken(refresh_token);
    const tokenObject = new TokenObject();
    tokenObject.token = access_token;
    tokenObject.access_token = access_token;
    tokenObject.refresh_token = refresh_token;
    tokenObject.expires_in = expires_in;
    tokenObject.token_type = 'Bearer';
    return tokenObject;
  }

  /**
   * 토큰을 재발급받습니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => TokenObject)
  async refreshToken(@Arg('refreshToken') refreshToken: string) {
    const expiresIn = 60 * 60 * 2; // 2h
    const user: any = await jwt.verify(refreshToken, CERT_PUBLIC);
    if (user.sub !== 'refresh_token') {
      throw new Error('Invalid token');
    }

    const access_token = await jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      CERT_PRIVATE,
      {
        algorithm: 'ES256',
        subject: 'access_token',
        expiresIn,
        issuer: JWT_ISSUER,
      },
    );

    const tokenObject = new TokenObject();
    tokenObject.token = access_token;
    tokenObject.access_token = access_token;
    tokenObject.refresh_token = undefined;
    tokenObject.expires_in = expiresIn;
    tokenObject.token_type = 'Bearer';
    return tokenObject;
  }
}
