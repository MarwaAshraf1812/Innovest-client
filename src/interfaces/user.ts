export interface AdminProfile {
  admin_id: string;
  username: string;
  email: string;
  profile_image: string;
  admin_state: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  permissions: string[];
  approved_pages: string[];
  communities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_image: string;
  phone: string;
  role: 'ENTREPRENEUR' | 'INVESTOR';
  country: string;
  permissions: string[];
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  investment_preferences ?: string[]
  user_languages ?: string[]
  user_interests ?: string[]
}

export type Profile = AdminProfile | UserProfile;
