import bcrypt from 'bcrypt';
import {UserEntity} from '../server/models/User/entities/User.entity';
// import {EMAIL, PASSWORD} from '../config/admin.config';

export default async function authenticate(email: string, password: string) {
  try {
    // if (EMAIL && PASSWORD && email === EMAIL && password === PASSWORD) {
    //   return {email};
    // }

    const user = await UserEntity.createQueryBuilder('user')
      .where('user.email = :email', {email})
      .getOne();

    if (!user?.passwordEncrypted) {
      throw new Error('Invalid user.');
    }

    const matched = await bcrypt.compare(password, user.passwordEncrypted);

    if (matched && user.isAdmin) {
      return {...user};
    }
  } catch (e) {}

  return false;
}
