import {ArgumentParser} from 'argparse';
import {createConnection} from 'typeorm';
import {UserEntity} from '../../server/models/User/entities/User.entity';

const parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Create admin',
});

parser.addArgument(['-e', '--email'], {
  help: 'Email',
});

parser.addArgument(['-p', '--password'], {
  help: 'Password',
});

const args = parser.parseArgs();

(async function() {
  const connection = await createConnection();

  console.log(
    await UserEntity.create({
      email: args.email,
      password: args.password,
      isAdmin: true,
    }).save(),
  );

  await connection.close();
})();
