USE honeyhub;

INSERT INTO app_user (email, username, first_name, last_name, password_hash, sex, profile_picture_path)
VALUES
(
    "murilo.unten@proton.me",
    "Kenj1",
    "Murilo",
    "Unten",
    "a$$word", -- trust me, this is not my real password for anything
    "M",
    "1.jpg"
),
(
    "thomaspinton@gmail.com",
    "Thomate",
    "Thomas",
    "Pinton",
    "bananinha123",
    "M",
    "2.jpg"
),
(
    "vkz.yamada@gmail.com",
    "vitkenji",
    "Vitor",
    "Yamada",
    "vai_furacao",
    "M",
    "3.jpg"
);

INSERT INTO community (community_name, description)
VALUES
(
    "utfpr",
    "A comunidade para alunos da UTFPR."
),
(
    "foss",
    "We are dedicated to the discussion of Free and Open Source Software, or FOSS."
),
(
    "soccer",
    "The football community. News, results, and discussion about the beautiful game."
),
(
    "linuxmasterrace",
    "this subreddit had a stupid description so I wrote this instead."
),
(
    "archlinux",
    "A community for the Arch Linux user community for support and useful news."
);

SELECT id INTO @uid FROM app_user WHERE username="Kenj1";
SELECT id INTO @cid FROM community WHERE community_name="archlinux";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);

SELECT id INTO @uid FROM app_user WHERE username="Kenj1";
SELECT id INTO @cid FROM community WHERE community_name="utfpr";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);

SELECT id INTO @uid FROM app_user WHERE username="Kenj1";
SELECT id INTO @cid FROM community WHERE community_name="foss";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);

SELECT id INTO @uid FROM app_user WHERE username="Thomate";
SELECT id INTO @cid FROM community WHERE community_name="utfpr";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);

SELECT id INTO @uid FROM app_user WHERE username="Thomate";
SELECT id INTO @cid FROM community WHERE community_name="soccer";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);

SELECT id INTO @uid FROM app_user WHERE username="Thomate";
SELECT id INTO @cid FROM community WHERE community_name="linuxmasterrace";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);

SELECT id INTO @uid FROM app_user WHERE username="vitkenji";
SELECT id INTO @cid FROM community WHERE community_name="utfpr";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);

SELECT id INTO @uid FROM app_user WHERE username="vitkenji";
SELECT id INTO @cid FROM community WHERE community_name="soccer";
INSERT INTO community_follower (user_id, community_id)
VALUES (@uid, @cid);


INSERT INTO post_type (type_name)
VALUES
("post"),
("comment");


SELECT id INTO @uid FROM app_user WHERE username="Kenj1";
SELECT id INTO @cid FROM community WHERE community_name="archlinux";
SELECT id INTO @tid FROM post_type WHERE type_name="post";
INSERT INTO post (user_id, community_id, post_type_id, parent_post_id, title, body)
VALUES
(
    @uid,
    @cid,
    @tid,
    NULL,
    "I use arch btw",
    "Yes, I do use archlinux, btw."
);

SELECT id INTO @uid FROM app_user WHERE username="Thomate";
SELECT id INTO @cid FROM community WHERE community_name="archlinux";
SELECT id INTO @tid FROM post_type WHERE type_name="comment";
SELECT id INTO @pid FROM post WHERE parent_post_id is NULL;
INSERT INTO post (user_id, community_id, post_type_id, parent_post_id, title, body)
VALUES
(
    @uid,
    @cid,
    @tid,
    @pid,
    NULL,
    "we already know man, pls just stop talking about it"
);


SELECT * FROM app_user;
SELECT * FROM community;
SELECT * FROM community_follower;
