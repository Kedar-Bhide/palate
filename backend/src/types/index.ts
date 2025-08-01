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
  cuisine_id: number;
  photo_url: string;
  caption?: string;
  created_at: Date;
}

export interface CuisineLogWithDetails extends CuisineLog {
  cuisine_name: string;
  cuisine_category: string;
}