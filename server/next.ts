/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server
 */

import * as url from "url";
import next from "next";
import expressApp from "./express";

/**
 * 개발환경인지 여부를 확인합니다.
 *
 * @author BounceCode, Inc.
 */
const dev = process.env.NODE_ENV === "development";

/**
 * Next.js SSR 서버를 설정합니다.
 *
 * @author BounceCode, Inc.
 */
const app = next({ dev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

/**
 * Next.js 를 {@link expressApp} 으로 실행합니다.
 *
 * @author BounceCode, Inc.
 */
const nextApp = async () => {
  await app.prepare();

  expressApp.get("*", (req: any, res: any) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    let parsedUrl = url.parse(req.url, true);

    // If there is a slash at the end of the URL, remove it before sending it to the handle() function.
    // This is a workaround for https://github.com/zeit/next.js/issues/5214
    const pathname = parsedUrl.pathname;
    if (pathname !== "/" && pathname?.endsWith("/") && parsedUrl.pathname) {
      parsedUrl = url.parse(parsedUrl.pathname.slice(0, -1), true);
    }

    return handle(req, res, parsedUrl);
  });

  return expressApp;
};

export default nextApp;
