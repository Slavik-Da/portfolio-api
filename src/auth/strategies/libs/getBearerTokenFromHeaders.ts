import { type Request } from 'express';

export const getBearerTokenFromHeaders = (req: Request): string => {
  const token = req.get('authorization')?.replace('Bearer', '').trim();
  return token ?? '';
};
