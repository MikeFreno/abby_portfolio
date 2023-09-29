const photography_table = `CREATE TABLE Photography (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT,
    images TEXT,
    cover_image VARCHAR(255),
    published BOOLEAN NOT NULL DEFAULT 0,
    photography_flow JSON,
    captions JSON
);`;

const film_table = `CREATE TABLE Film (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN NOT NULL DEFAULT 0
);`;

const commercial_table = `CREATE TABLE Commercial (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN NOT NULL DEFAULT 0
);`;

const sketch_table = `CREATE TABLE Sketch (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN NOT NULL DEFAULT 0
);`;

const acting_table = `CCREATE TABLE Acting (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN NOT NULL DEFAULT 0
);REATE TABLE Acting (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN NOT NULL DEFAULT 0
);`;
