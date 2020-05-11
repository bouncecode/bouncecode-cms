import { ArgumentParser } from "argparse";
import { createConnection } from "typeorm";
import { UserEntity } from "../../server/models/User/User.entity";

const parser = new ArgumentParser({
  version: "0.0.1",
  addHelp: true,
  description: "Reset admin",
});

parser.addArgument(["-e", "--email"], {
  help: "Email",
});

const args = parser.parseArgs();

(async function () {
  const connection = await createConnection();

  console.log(
    await UserEntity.update(
      {
        email: args.email,
      },
      {
        isAdmin: true,
      }
    )
  );

  await connection.close();
})();
