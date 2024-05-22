DROP DATABASE IF EXISTS "honeyhub";
CREATE DATABASE "honeyhub";
USE "honeyhub";


CREATE TABLE app_user (
    id INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(50),
    password_hash VARCHAR(32) NOT NULL,
    sex VARCHAR(1),
    PRIMARY KEY (id)
);

CREATE TABLE community (
    id INT NOT NULL,
    community_name VARCHAR(20),
    description VARCHAR(100),
    -- logo some kind of blob,
    -- banner some kind of blob,
    PRIMARY KEY (id)
);

CREATE TABLE community_follower (
    id INT NOT NULL,
    user_id INT NOT NULL,
    community_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) app_user(id),
    FOREIGN KEY (community_id) community(id)
);

CREATE TABLE post (
    id INT NOT NULL,
    user_id INT NOT NULL,
    community_id INT NOT NULL,
    post_type_id INT NOT NULL,
    parent_post_id INT,
    title VARCHAR(100),
    body VARCHAR(500),
    PRIMARY KEY (id),
    FOREIGN KEY (community_id) REFERENCES community(id),
    FOREIGN KEY (post_type_id) REFERENCES post_type(id),
    FOREIGN KEY (parent_post_id) REFERENCES post(id)
);

CREATE TABLE reaction (
    id INT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    up_or_down_vote VARCHAR(1),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) app_user(id),
    FOREIGN KEY (post_id) post(id)
);

CREATE TABLE post_media (
    id INT NOT NULL;
    post_id INT NOT NULL;
    -- media some kind of blob
    PRIMARY KEY (id),
    FOREIGN KEY (post_id) post(id)
);

CREATE TABLE post_type (
    id INT NOT NULL,
    type_name VARCHAR(10),
    PRIMARY KEY (id),
);
