import { hash, genSalt, compare } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);

  return hash(password, salt);
};

export const validatePassword = (input: string, password: string): Promise<boolean> =>
  compare(input, password);
