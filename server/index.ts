/**
 * 서버를 실행하는 entrypoint 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server
 * @preferred
 */

import nextApp from "./next";
import { PORT } from "../env.config";

/**
 * {@link nextApp} 을 실행합니다.
 *
 * @author BounceCode, Inc.
 */
nextApp()
  .then((server) => {
    server.listen(PORT, () => {
      console.log(`Server ready on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
