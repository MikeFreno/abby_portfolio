const photography_table = `CREATE TABLE Photography (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT,
    images TEXT,
    published BOOLEAN,
    photography_flow JSON,
    captions JSON
);`;

const film_table = `CREATE TABLE Film (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT NOT NULL,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN
);`;

const commercial_table = `CREATE TABLE Commercial (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT NOT NULL,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN
);`;

const sketch_table = `CREATE TABLE Sketch (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT NOT NULL,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN
);`;

const acting_table = `CREATE TABLE Acting (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    blurb TEXT NOT NULL,
    link VARCHAR(255),
    attachments TEXT,
    published BOOLEAN
);`;
