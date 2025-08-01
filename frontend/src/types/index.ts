export interface User {
  id: string;
  email: string;
  name: string;
  profile_pic: string;
  created_at: Date;
}

export interface Cuisine {
  id: number;
  name: string;
  category: string;
}

export interface CuisineLog {
  id: string;
  user_id: string;
  photo_url: string;
  caption?: string;
  created_at: Date;
  cuisines: Cuisine[];
}

export interface UserStats {
  total_cuisines: number;
}