import next from "./next";
import { PORT } from "../envconfig";

next()
  .then((server) => {
    server.listen(PORT, () => {
      console.log(`Server ready on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
