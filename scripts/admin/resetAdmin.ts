import { UserEntity } from "../../server/models/User/entities/User.entity";
import { createConnection } from "typeorm";

(async function () {
  const connection = await createConnection();

  console.log(
    await UserEntity.update(
      {
        isAdmin: true,
      },
      {
        isAdmin: false,
      }
    )
  );

  await connection.close();
})();
