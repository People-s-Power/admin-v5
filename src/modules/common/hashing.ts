import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { createHash } from 'crypto';

export const hashPassword = (password: string)  => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

export const matchPassword = (password: string, hash: string) => compareSync(password, hash);

export const createHash215 = (value: string) => {
    const Hash = createHash('sha512');
	return Hash.update(value, 'utf-8').digest('hex');
}
