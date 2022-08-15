import { Exclude, Expose } from "class-transformer";

export interface UserDTO
{
  username: string;
  password: string
}

export class UserTransformer
{
  @Exclude()
  username: string

  @Exclude()
  password: string;

  @Expose()
  get capitalizedUsername() { 
    return this.username.toUpperCase()
  }

  constructor(partial: Partial<UserTransformer>) {
    Object.assign(this, partial)
  }
}