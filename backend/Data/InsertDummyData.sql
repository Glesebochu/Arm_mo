USE [Arm_mo]
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
('Write'),
('Exercise'),
('Review'),
('Meditate'),
('Plan');

-- Insert dummy data into ObservableObjects
-- Meditation objects are noun phrases
INSERT INTO [dbo].[ObservableObjects] (Title, Description, Intensity, SubType, ProximityToMO)
VALUES
('four paragraphs from a book', 'Reading four paragraphs from a book', 3, 1, 5),
('a short story', 'Writing a short story', 2, 1, 3),
('a workout routine', 'Following a workout routine', 4, 2, 2),
('notes from a meeting', 'Reviewing notes from a meeting', 2, 1, 4),
('breathing exercises', 'Performing breathing exercises', 3, 1, 5),
('daily schedule', 'Planning a daily schedule', 1, 2, 1);

-- Insert dummy data into Goals
-- Each goal includes a status, optional parent goal, activity, and meditation object
INSERT INTO [dbo].[Goals] (Status, ParentGoalId, ActivityId, MeditationObjectId, DueDate, CompletedDate)
VALUES
(1, NULL, 1, 1, '2024-06-01', '2024-05-01'),  -- Read four paragraphs from a book
(2, NULL, 2, 2, '2024-06-02', '2024-05-02'),  -- Write a short story
(0, NULL, 3, 3, '2024-06-03', '2024-05-03'),  -- Exercise with a workout routine
(0, 1, 4, 4, '2024-06-04', '2024-05-04'),     -- Review notes from a meeting (child of Read)
(0, 1, 5, 5, '2024-06-05', '2024-05-05'),     -- Meditate with breathing exercises (child of Read)
(0, 2, 6, 6, '2024-06-06', '2024-05-06'),     -- Plan daily schedule (child of Write)
(0, 3, 1, 1, '2024-06-07', '2024-05-07'),     -- Read four paragraphs from a book (child of Exercise)
(0, 4, 2, 2, '2024-06-08', '2024-05-08');     -- Write a short story (child of Review)
