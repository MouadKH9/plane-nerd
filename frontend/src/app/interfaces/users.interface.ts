export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: String;
}

export interface Tasker {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: String;
  description?: string;
  phone?: String;
  categories?: Array<any>;
  location?: any;
  affectations?: any;
  rating?: number;
  hourly?: number;
  count?: number;
}
