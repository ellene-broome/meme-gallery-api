-- db/crud.sql
INSERT INTO users (username, password) VALUES ('alice', 'password123');
INSERT INTO memes (title, url, user_id)
VALUES ('Distracted Boyfriend', 'https://i.imgur.com/example1.jpg', 1);

SELECT * FROM memes;

UPDATE memes SET title = 'Updated Meme' WHERE id = 1;

DELETE FROM memes WHERE id = 1;

SELECT * FROM memes;
