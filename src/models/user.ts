import { User } from '@prisma/client';

export class UserModel implements User {
  email: string;
  password: string;
  name: string;
  hash: string;
  salt: string;
  id: string;

  constructor(
    _email: string,
    _password: string,
    _name: string,
    _hash: string,
    _salt: string,
  ) {
    this.email = _email;
    this.password = _password;
    this.name = _name;
    this.hash = _hash;
    this.salt = _salt;
}
}
