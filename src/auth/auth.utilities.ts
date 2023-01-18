import * as bcrypt from 'bcrypt';

export const encodeHash = async (password: string, salt: string) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};
