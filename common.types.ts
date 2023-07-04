import { User, Session } from 'next-auth'

export type FormState = {
  title: string;
  description: string;
  image: string;
  InstagramUrl: string;
  category: string;
};

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  InstagramUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  avatarUrl: string;
  InstagramUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  InstagramUrl: string;
  category: string;
}