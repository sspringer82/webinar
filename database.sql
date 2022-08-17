create database users;

use users;

create table users (id int primary key auto_increment, firstname varchar(255), lastname varchar(255), username varchar(255), password varchar(255));

insert into users (firstname, lastname, username, password) values ('Basti', 'Springer', 'sspringer', 'geheim'), ('Claudia', 'Mueller', 'cmueller', 'geheim'), ('Brigitte', 'Meier', 'bmeier', 'geheim'), ('Benno', 'Schmitt', 'bschmitt', 'geheim');