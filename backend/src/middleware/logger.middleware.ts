import type { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date(start).toISOString()}] [${req.method}] [${req.originalUrl}] - [${
        res.statusCode
      }] - [${duration}ms]`,
    );
  });

  next();
};
