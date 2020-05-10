import * as url from "url";
import next from "next";
import server from "./express";

const dev = process.env.NODE_ENV === "development";
const app = next({ dev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

export default async () => {
  await app.prepare();

  server.get("*", (req: any, res: any) => {
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

  return server;
};
