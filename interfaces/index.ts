export type State = {
  email: string | null;
  loading: boolean;
};

export type LoginFormInput = {
  email: string;
  password: string;
};

export type SignUpFormInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
