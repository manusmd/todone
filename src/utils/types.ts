export type LoginUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type Projects = {
  id: string;
  title: string;
  user_id: string;
  todos: ToDo[];
};

export type ToDo = {
  id: string;
  title: string;
  done: boolean;
  project: string;
};
