DROP DATABASE IF EXISTS honeyhub;
CREATE DATABASE honeyhub;
USE honeyhub;


CREATE TABLE app_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(30) DEFAULT "UNDEFINED",
    last_name VARCHAR(50) DEFAULT "UNDEFINEDJ",
    password_hash VARCHAR(32) NOT NULL,
    sex VARCHAR(1) DEFAULT "_",
    profile_picture_path VARCHAR(255) DEFAULT "default.png"
);

CREATE TABLE community (
    id INT PRIMARY KEY AUTO_INCREMENT,
    community_name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(100),
    logo_path VARCHAR(255),
    banner_path VARCHAR(255)
);

CREATE TABLE community_follower (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    community_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user(id),
    FOREIGN KEY (community_id) REFERENCES community(id)
);

CREATE TABLE post_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    community_id INT NOT NULL,
    post_type_id INT NOT NULL,
    parent_post_id INT,
    title VARCHAR(100),
    body VARCHAR(500),
    FOREIGN KEY (community_id) REFERENCES community(id),
    FOREIGN KEY (post_type_id) REFERENCES post_type(id),
    FOREIGN KEY (parent_post_id) REFERENCES post(id)
);

CREATE TABLE reaction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    up_or_down_vote VARCHAR(1) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES app_user(id),
    FOREIGN KEY (post_id) REFERENCES post(id)
);

CREATE TABLE post_media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    media_path VARCHAR(255),
    FOREIGN KEY (post_id) REFERENCES post(id)
);

