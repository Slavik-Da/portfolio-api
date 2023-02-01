import { type Request } from 'express';

export const getBearerTokenFromHeaders = (req: Request) => {
  req.get('authorization')?.replace('Bearer', '').trim();
};
