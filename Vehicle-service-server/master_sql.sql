CREATE TABLE `auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `booking` (
  `bookingId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `vehicleId` int NOT NULL,
  `serviceCenterId` int NOT NULL,
  `date` timestamp NOT NULL,
  `timeslot` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isVerified` enum('Yes','No','Rejected') NOT NULL DEFAULT 'No',
  PRIMARY KEY (`bookingId`),
  KEY `userId` (`userId`),
  KEY `vehicleId` (`vehicleId`),
  KEY `serviceCenterId` (`serviceCenterId`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`vehicleId`) ON DELETE CASCADE,
  CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`serviceCenterId`) REFERENCES `servicecenter` (`servicecenterId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mechanic` (
  `mechanicId` int NOT NULL,
  `servicecenterId` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  `availability` enum('Available','Unavailable','On Leave') DEFAULT NULL,
  `rating` enum('Excellent','Good','Average','Poor') DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isVerified` enum('yes','no','rejected') DEFAULT 'no',
  `status` enum('active','inActive') DEFAULT 'active',
  `phone` varchar(10) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mechanicId`),
  UNIQUE KEY `mechanicId` (`mechanicId`),
  KEY `servicecenterId` (`servicecenterId`),
  CONSTRAINT `mechanic_ibfk_1` FOREIGN KEY (`mechanicId`) REFERENCES `auth` (`id`),
  CONSTRAINT `mechanic_ibfk_2` FOREIGN KEY (`servicecenterId`) REFERENCES `servicecenter` (`servicecenterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `servicecenter` (
  `servicecenterId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `contact` bigint DEFAULT NULL,
  `rating` enum('Excellent','Good','Average','Poor') DEFAULT NULL,
  `feedback` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`servicecenterId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `servicetype` (
  `serviceTypeId` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive') DEFAULT NULL,
  `serviceCenterId` int DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`serviceTypeId`),
  KEY `fk_serviceCenterId` (`serviceCenterId`),
  CONSTRAINT `fk_serviceCenterId` FOREIGN KEY (`serviceCenterId`) REFERENCES `servicecenter` (`servicecenterId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `skill` (
  `skill_id` int NOT NULL,
  `skill_name` varchar(100) NOT NULL,
  PRIMARY KEY (`skill_id`,`skill_name`),
  UNIQUE KEY `skill_name` (`skill_name`),
  CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`skill_id`) REFERENCES `mechanic` (`mechanicId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` enum('active','inActive') NOT NULL DEFAULT 'active',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vehicles` (
  `vehicleId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `make` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `year` year DEFAULT NULL,
  `registration_number` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `vehicle_type` enum('car','bike') NOT NULL DEFAULT 'car',
  `engine` varchar(255) DEFAULT NULL,
  `abs` varchar(255) DEFAULT NULL,
  `doors` varchar(255) DEFAULT NULL,
  `ac` varchar(255) DEFAULT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `fuel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vehicleId`),
  KEY `userId` (`userId`),
  CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

