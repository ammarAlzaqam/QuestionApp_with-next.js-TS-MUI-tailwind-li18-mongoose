export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export interface UpdateUserPassDto {
  password: string;
  newPassword: string;
}

export interface CreateTagDto {
  name: string;
  description: string;
  slug?: string;
}
