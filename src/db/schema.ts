import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const roles = [
  'Guest', 'Student', 'Doctor', 
  'Editor', 'Moderator', 'Committee Manager', 'Regional Admin', 'Accountant',
  'Admin', 'Super Admin'
] as const;
export type Role = (typeof roles)[number];

export const userStatus = ['Pending', 'Approved', 'Rejected', 'Suspended'] as const;
export type UserStatus = (typeof userStatus)[number];

// Main Profiles Table (Shared Data)
export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  full_name: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  mobile: text('mobile').notNull(),
  password_hash: text('password_hash').notNull(),
  gender: text('gender'),
  marital_status: text('marital_status'),
  dob: text('dob'), // Date string format
  role: text('role').$type<Role>().default('Guest').notNull(),
  avatar_url: text('avatar_url'),
  status: text('status').$type<UserStatus>().default('Pending').notNull(),
  
  // Location Data (Non-Guest mostly)
  district: text('district'),
  state: text('state'),
  pincode: text('pincode'),
  address: text('address'),
  permanent_address: text('permanent_address'),
  
  // Additional Info
  occupation: text('occupation'), // Guest specific 
  blood_group: text('blood_group'),
  document_url: text('document_url'), // ID Proof
  
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updated_at: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  deleted_at: integer('deleted_at', { mode: 'timestamp' }), // Soft Delete
});

// Doctor Specific Data
export const doctor_details = sqliteTable('doctor_details', {
  id: text('id').primaryKey().references(() => profiles.id, { onDelete: 'cascade' }),
  degree: text('degree'),
  specialization: text('specialization'),
  hospital_name: text('hospital_name'),
  present_working_place: text('present_working_place'),
  registration_no: text('registration_no'),
  experience: text('experience'), // Years
});

// Student Specific Data
export const student_details = sqliteTable('student_details', {
  id: text('id').primaryKey().references(() => profiles.id, { onDelete: 'cascade' }),
  college: text('college'),
  university: text('university'),
  course: text('course'),
  year: text('year'),
  college_entry_year: text('college_entry_year'),
  gotra_father: text('gotra_father'),
  gotra_mother: text('gotra_mother'),
  gotra_grandmother: text('gotra_grandmother'),
});

// Committees Table
export const committees = sqliteTable('committees', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  level: text('level', { enum: ['National', 'State', 'District'] }).notNull(),
  parent_id: text('parent_id'), // Hierarchical
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Committee Members
export const committee_members = sqliteTable('committee_members', {
  id: text('id').primaryKey(),
  committee_id: text('committee_id').references(() => committees.id),
  profile_id: text('profile_id').references(() => profiles.id),
  designation: text('designation').notNull(),
  rank: integer('rank').default(0), // For drag-and-drop reordering
});

// Social Feed (Posts)
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  profile_id: text('profile_id').references(() => profiles.id),
  content: text('content').notNull(),
  image_url: text('image_url'),
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Post Likes
export const post_likes = sqliteTable('post_likes', {
  id: text('id').primaryKey(),
  post_id: text('post_id').references(() => posts.id),
  profile_id: text('profile_id').references(() => profiles.id),
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Post Comments
export const post_comments = sqliteTable('post_comments', {
  id: text('id').primaryKey(),
  post_id: text('post_id').references(() => posts.id),
  profile_id: text('profile_id').references(() => profiles.id),
  content: text('content').notNull(),
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
