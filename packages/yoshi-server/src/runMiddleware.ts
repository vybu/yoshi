import { Response, Request, NextFunction } from 'express';

export default async (
  req: Request,
  res: Response,
  middleware: (req: Request, res: Response, next: NextFunction) => void,
) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};
