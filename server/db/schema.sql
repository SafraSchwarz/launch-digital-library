DROP TABLE IF EXISTS books;

CREATE TABLE books (
id SERIAL PRIMARY KEY,
title VARCHAR(225) NOT NULL,
author VARCHAR(225) NOT NULL,
page_count INTEGER NOT NULL,
description TEXT,
fiction BOOLEAN
);

INSERT INTO books (title, author, page_count, description, fiction)
  VALUES
    ('Jam','Yahtzee Croshaw', 400, 'Sentient jam!', true),
    ('The Lord of the Rings', 'J.R.R Tolkien', 1137, 'Destory the one ring, the advendture',true),
    ('The Battle for God', 'Karen Armstrong', 445, 'A history of fundamentalism', false);