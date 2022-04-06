/**
 * 서버를 실행하는 entrypoint 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @preferred
 */

import nextApp from './next';
import {PORT} from '../env.config';
import {connectDatabase} from './lib/connectDatabase';

const dev = process.env.NODE_ENV === 'development';

/**
 * {@link nextApp} 을 실행합니다.
 *
 * @author BounceCode, Inc.
 */
nextApp()
  .then(server => {
    server.listen(PORT, () => {
      console.log(`Server ready on http://localhost:${PORT}`);

      connectDatabase()
        .then(() => {
          if (!dev) {
            process.send('ready');
          }
        })
        .catch(e => {
          console.error(e);
        });
    });
  })
  .catch(e => {
    console.error(e);
  });
