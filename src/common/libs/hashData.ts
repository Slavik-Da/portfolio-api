import { hash } from 'argon2';

export const hashData = async (data: string): Promise<string> => {
  return await hash(data);
};
