import { createConnection, getConnectionManager } from "typeorm";
import seeds from "../../seeds";

const connectDatabase = async () => {
  try {
    if (getConnectionManager().get().isConnected) {
      return;
    }
  } catch (e) {}

  await createConnection();
  await seeds();
};

export default connectDatabase;
