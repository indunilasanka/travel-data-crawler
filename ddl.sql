CREATE TABLE `location` (
                            `id` int NOT NULL AUTO_INCREMENT,
                            `name` varchar(45) DEFAULT NULL,
                            `parent_id` int DEFAULT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


INSERT INTO location(id, name, parent_id)
VALUES(1, 'Sri Lanka', NULL);

INSERT INTO location(id, name, parent_id)
VALUES(2, 'Trinco', 1);

INSERT INTO location(id, name, parent_id)
VALUES(3, 'Galle', 1);
