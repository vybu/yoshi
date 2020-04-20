import { Response } from 'express';

export default async (res: Response, templatePath: string, data: any = {}) => {
  (res as any).renderView(templatePath, data);
};
