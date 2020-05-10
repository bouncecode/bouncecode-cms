import { UserEntity } from "./server/models/User/User.entity";

const seeds = async () => {
  const admin = await UserEntity.findOne({
    where: {
      isAdmin: true,
    },
  });

  if (!admin) {
    await UserEntity.create({
      username: "admin",
      password: "1234",
      isAdmin: true,
    }).save();
  }
};

export default seeds;
