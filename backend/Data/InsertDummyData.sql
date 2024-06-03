USE [Arm_moEF3]
GO

-- Insert dummy data into Addresses
INSERT INTO [dbo].[Addresses] (City, State, Country)
VALUES
('New York', 'NY', 'USA'),
('Los Angeles', 'CA', 'USA'),
('Chicago', 'IL', 'USA');

-- Insert dummy data into Meditators
INSERT INTO [dbo].[Meditators] (FirstName, LastName, Username, Email, AddressId)
VALUES
('John', 'Doe', 'johndoe', 'johndoe@example.com', 1),
('Jane', 'Smith', 'janesmith', 'janesmith@example.com', 2),
('Alice', 'Johnson', 'alicej', 'alicej@example.com', 3);

-- Insert dummy data into Activities
-- Activities are verbs
INSERT INTO [dbo].[Activities] (Title)
VALUES
('Read'),
('Build'),
('Identify'),
('Jog');

-- Insert dummy data into ObservableObjects
-- Meditation objects are noun phrases
INSERT INTO [dbo].[ObservableObjects] (Title, Description, Intensity, SubType, ProximityToMO)
VALUES
('a book', 'Reading a book', 3, 1, 2),
('the first chapter', 'Reading the first chapter of a book', 2, 1, 3),
('four paragraphs', 'Reading four paragraphs from the first chapter', 1, 1, 1),
('the user management module', 'Building the user management module', 4, 2, 2),
('use cases', 'Identifying the use cases for the module', 2, 1, 2),
('MVCs', 'Identifying the Model-View-Controllers for the module', 2, 1, 3),
('5 kilometers', 'Jogging 5 kilometers', 5, 2, 2);

-- Insert dummy data into Goals
-- Each goal includes a status, optional parent goal, activity, and meditation object
INSERT INTO [dbo].[Goals] (Status, ParentGoalId, ActivityId, MeditationObjectId, DueDate, CompletedDate)
VALUES
(1, NULL, 1, 1, '2024-06-01', '2024-05-01'),        -- Read a book
    (0, 1, 1, 2, '2024-06-02', '2024-05-02'),           -- Read the first chapter (child of Read a book)
        (0, 2, 1, 3, '2024-06-03', '2024-05-03'),           -- Read four paragraphs from the first chapter (child of Read the first chapter)
(1, NULL, 2, 4, '2024-06-04', '2024-05-04'),        -- Build the user management module
    (0, 4, 3, 5, '2024-06-05', '2024-05-05'),           -- Identify the use cases (child of Build the user management module)
    (0, 4, 3, 6, '2024-06-06', '2024-05-06'),           -- Identify the MVCs (child of Build the user management module)
(1, NULL, 4, 7, '2024-06-07', '2024-05-07');        -- Jog 5 kilometers
