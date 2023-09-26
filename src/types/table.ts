//this is mainly for reference
const projectCreation = `CREATE TABLE Row (
    id INT PRIMARY KEY,
    Title VARCHAR(255), 
    Blurb VARCHAR(255) NULL, 
    Embedded_Link VARCHAR(255) NULL, 
    Attachments VARCHAR(255) NULL, 
    Published BOOLEAN, 
    Type ENUM('film', 'commercial', 'photography'), 
    PhotographyFlow JSON NULL
); `; //type is currently a VARCHAR(255), should be changed
