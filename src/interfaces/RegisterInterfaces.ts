export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  country: string;
  national_id: string;
  id_doc: FileList | null;
  profile_image: FileList | null;
  role: string;
  password: string;
}

export interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  username?: string;
  country?: string;
  national_id?: string;
  role?: string;
  password?: string;
  profile_image?: string;
  id_doc?: string;
}