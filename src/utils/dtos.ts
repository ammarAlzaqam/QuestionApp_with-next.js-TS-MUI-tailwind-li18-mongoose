//TODO>> User Types
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

//TODO>> Tag Types
export interface CreateTagDto {
  name: string;
  description: string;
  slug?: string;
}

//TODO>> Post Types
export interface CreatePostDto {
  title: string;
  content: string;
  tags: string[];
}

export interface AddAnswerDto {
  content: string;
  question: string;
}

export interface AddVoteDto {
  postId: string;
  voteType: boolean;
}

export interface AcceptAnswerDto {
  question: string;
  answer: string
}