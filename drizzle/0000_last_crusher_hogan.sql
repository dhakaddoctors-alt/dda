CREATE TABLE `committee_members` (
	`id` text PRIMARY KEY NOT NULL,
	`committee_id` text,
	`profile_id` text,
	`designation` text NOT NULL,
	`rank` integer DEFAULT 0,
	FOREIGN KEY (`committee_id`) REFERENCES `committees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `committees` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`level` text NOT NULL,
	`parent_id` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `doctor_details` (
	`id` text PRIMARY KEY NOT NULL,
	`degree` text,
	`specialization` text,
	`hospital_name` text,
	`present_working_place` text,
	`registration_no` text,
	`experience` text,
	FOREIGN KEY (`id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `post_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text,
	`profile_id` text,
	`content` text NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `post_likes` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text,
	`profile_id` text,
	`created_at` integer,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text,
	`content` text NOT NULL,
	`image_url` text,
	`created_at` integer,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`mobile` text NOT NULL,
	`password_hash` text NOT NULL,
	`gender` text,
	`marital_status` text,
	`dob` text,
	`role` text DEFAULT 'Guest' NOT NULL,
	`avatar_url` text,
	`status` text DEFAULT 'Pending' NOT NULL,
	`district` text,
	`state` text,
	`pincode` text,
	`address` text,
	`permanent_address` text,
	`occupation` text,
	`blood_group` text,
	`document_url` text,
	`created_at` integer,
	`updated_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_email_unique` ON `profiles` (`email`);--> statement-breakpoint
CREATE TABLE `student_details` (
	`id` text PRIMARY KEY NOT NULL,
	`college` text,
	`university` text,
	`course` text,
	`year` text,
	`college_entry_year` text,
	`gotra_father` text,
	`gotra_mother` text,
	`gotra_grandmother` text,
	FOREIGN KEY (`id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade
);
