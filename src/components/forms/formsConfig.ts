interface Field {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'file' | 'select' | 'textarea' | 'checkbox' | 'number'
  options?: string[]
  required?: boolean
}

export const adminFields: Field[] = [
  { name: 'username', label: 'Username', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
  { name: 'profile_image', label: 'Profile Image', type: 'file' },
  {
    name: 'admin_state',
    label: 'Admin State',
    type: 'select',
    options: ['APPROVER', 'REVIEWER'],
    required: true,
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: ['SUPER_ADMIN', 'ADMIN'],
    required: true,
  },
]

export const communityFields: Field[] = [
  { name: 'community_name', label: 'Community Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'image_url', label: 'Image URL', type: 'file' },
  { name: 'tags', label: 'Tags', type: 'text' },
]

export const userFields: Field[] = [
  { name: 'first_name', label: 'First Name', type: 'text', required: true },
  { name: 'last_name', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'text' },
  { name: 'country', label: 'Country', type: 'text' },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: ['ENTREPRENEUR', 'INVESTOR'],
    required: true,
  },
]
