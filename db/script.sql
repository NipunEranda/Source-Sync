DROP DATABASE IF EXISTS `source_sync`;

CREATE DATABASE IF NOT EXISTS pms DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `source_sync`;

CREATE TABLE usr_User(
    id BIGINT(200) NOT NULL AUTO_INCREMENT,
    githubId BIGINT(200) NOT NULL,
    company BIGINT(200) DEFAULT NULL,
    CONSTRAINT usr_User_pk PRIMARY KEY(id)
);

CREATE TABLE usr_Settings(
    id BIGINT(200) NOT NULL AUTO_INCREMENT,
    userId BIGINT(200) NOT NULL,
    s3_bucket_name VARCHAR(255) DEFAULT NULL,
    s3_bucket_class VARCHAR(255) DEFAULT NULL,
    aws_access_key TEXT DEFAULT NULL,
    aws_access_secret TEXT DEFAULT NULL,
    aws_ssh_key TEXT DEFAULT NULL,
    CONSTRAINT usr_Settings_pk PRIMARY KEY(id),
    CONSTRAINT usr_Settings_fk FOREIGN KEY(userId) REFERENCES usr_User(id)
);

CREATE TABLE tbl_Company(
    id BIGINT(200) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    s3_bucket_name VARCHAR(255) DEFAULT NULL,
    s3_bucket_class VARCHAR(255) DEFAULT NULL,
    aws_access_key TEXT DEFAULT NULL,
    aws_access_secret TEXT DEFAULT NULL,
    aws_ssh_key TEXT DEFAULT NULL,
    CONSTRAINT tbl_Company_pk PRIMARY key(id)
);