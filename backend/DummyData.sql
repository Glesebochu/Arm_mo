USE Arm_moEF3;

-- Insert dummy data into Stages
INSERT INTO Stages (Goal) VALUES
('Develop a consistent daily meditation practice.'),
('Shorten the periods of mind-wandering and extend the periods of sustained attention to the meditation object'),
('Overcome gross distraction and strong dullness.');

-- Insert dummy data into Meditator
INSERT INTO Meditators (CurrentStageId, Username, FirstName, LastName, _password, Email) VALUES
(1, 'meditator1', 'John', 'Doe', 'password1', 'john.doe@example.com'),
(2, 'meditator2', 'Jane', 'Smith', 'password2', 'jane.smith@example.com'),
(3, 'meditator3', 'Jim', 'Beam', 'password3', 'jim.beam@example.com');

-- Insert dummy data into dbo.UserUsage
INSERT INTO dbo.UserUsage (UserId, Date, StartTime, UsageTime)
VALUES 
(1, '2024-05-15', '08:00:00', '00:30:00'),  -- 30 minutes
(1, '2024-05-16', '09:00:00', '00:45:00'),  -- 45 minutes
(1, '2024-05-17', '10:15:00', '00:40:00'),  -- 40 minutes
(1, '2024-05-18', '07:30:00', '01:00:00'),  -- 1 hour
(1, '2024-05-19', '08:45:00', '00:50:00'),  -- 50 minutes
(1, '2024-05-20', '09:00:00', '00:25:00'),  -- 25 minutes
(1, '2024-05-21', '14:00:00', '00:35:00'),  -- 35 minutes
(1, '2024-05-22', '08:15:00', '00:55:00'),  -- 55 minutes
(1, '2024-05-23', '17:00:00', '01:10:00'),  -- 1 hour 10 minutes
(1, '2024-05-24', '06:45:00', '00:20:00'),  -- 20 minutes
(1, '2024-05-25', '12:30:00', '00:40:00'),  -- 40 minutes
(1, '2024-05-26', '09:00:00', '01:20:00'),  -- 1 hour 20 minutes
(1, '2024-05-27', '18:00:00', '00:30:00'),  -- 30 minutes
(1, '2024-05-28', '10:00:00', '00:50:00'),  -- 50 minutes
(1, '2024-05-29', '11:00:00', '01:05:00');  -- 1 hour 5 minutes

-- Insert dummy data into Sessions linked with Meditator
DECLARE @MeditatorId1 INT = (SELECT TOP 1 Id FROM Meditators WHERE Username = 'meditator1');
DECLARE @MeditatorId2 INT = (SELECT TOP 1 Id FROM Meditators WHERE Username = 'meditator2');
DECLARE @MeditatorId3 INT = (SELECT TOP 1 Id FROM Meditators WHERE Username = 'meditator3');

INSERT INTO Sessions (MeditatorId, StartTime, EndTime) VALUES
(@MeditatorId1, '2023-05-01T08:30:00', '2023-05-01T09:30:00'),
(@MeditatorId1, '2023-05-02T07:45:00', '2023-05-02T08:45:00'),
(@MeditatorId1, '2023-05-03T10:00:00', '2023-05-03T11:00:00'),
(@MeditatorId1, '2023-05-04T09:15:00', '2023-05-04T10:15:00'),
(@MeditatorId1, '2023-05-05T08:00:00', '2023-05-05T09:00:00'),
(@MeditatorId1, '2023-05-06T07:30:00', '2023-05-06T08:30:00'),
(@MeditatorId1, '2023-05-07T08:00:00', '2023-05-07T09:00:00'),
(@MeditatorId1, '2023-05-08T07:00:00', '2023-05-08T08:00:00'),
(@MeditatorId1, '2023-05-09T10:30:00', '2023-05-09T11:30:00'),
(@MeditatorId1, '2023-05-10T09:00:00', '2023-05-10T10:00:00'),
(@MeditatorId1, '2023-05-11T08:45:00', '2023-05-11T09:45:00'),
(@MeditatorId1, '2023-05-12T07:15:00', '2023-05-12T08:15:00');

-- Declare session IDs for use in inserts
DECLARE @SessionId1 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-01T08:30:00');
DECLARE @SessionId2 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-02T07:45:00');
DECLARE @SessionId3 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-03T10:00:00');
DECLARE @SessionId4 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-04T09:15:00');
DECLARE @SessionId5 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-05T08:00:00');
DECLARE @SessionId6 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-06T07:30:00');
DECLARE @SessionId7 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-07T08:00:00');
DECLARE @SessionId8 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-08T07:00:00');
DECLARE @SessionId9 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-09T10:30:00');
DECLARE @SessionId10 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-10T09:00:00');
DECLARE @SessionId11 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-11T08:45:00');
DECLARE @SessionId12 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-12T07:15:00');



-- Insert unique PracticedStages for each session with MeditatorId
INSERT INTO PracticedStage (SessionId, StageId, MeditatorId) VALUES
(@SessionId1, 1, @MeditatorId1),
(@SessionId1, 2, @MeditatorId1),
(@SessionId2, 1, @MeditatorId1),
(@SessionId2, 2, @MeditatorId1),
(@SessionId3, 2, @MeditatorId1),
(@SessionId3, 3, @MeditatorId1),
(@SessionId4, 1, @MeditatorId1),
(@SessionId4, 2, @MeditatorId1),
(@SessionId5, 2, @MeditatorId1),
(@SessionId5, 3, @MeditatorId1),
(@SessionId6, 1, @MeditatorId1),
(@SessionId6, 3, @MeditatorId1),
(@SessionId7, 1, @MeditatorId1),
(@SessionId7, 2, @MeditatorId1),
(@SessionId8, 2, @MeditatorId1),
(@SessionId8, 3, @MeditatorId1),
(@SessionId9, 1, @MeditatorId1),
(@SessionId9, 3, @MeditatorId1),
(@SessionId10, 1, @MeditatorId1),
(@SessionId10, 2, @MeditatorId1),
(@SessionId11, 2, @MeditatorId1),
(@SessionId11, 3, @MeditatorId1),
(@SessionId12, 1, @MeditatorId1),
(@SessionId12, 3, @MeditatorId1);

-- Insert unique NewlyMasteredStages ensuring no duplicate mastery within a session and in ascending order
INSERT INTO NewlyMasteredStage (SessionId, StageId) VALUES
(@SessionId1, 1),  -- Session 1: Mastering Stage 1
(@SessionId2, 2),  -- Session 2: Mastering Stage 2
(@SessionId5, 3);  -- Session 5: Mastering Stage 3

-- Insert varied AhaMoments into different sessions to create the desired trend
INSERT INTO AhaMoments (SessionId, Label) VALUES
(@SessionId1, 'Phone Notification'),
(@SessionId1, 'Pet Movement'),
(@SessionId1, 'Traffic Noise'),

(@SessionId2, 'Phone Notification'),
(@SessionId2, 'Pet Movement'),
(@SessionId2, 'Traffic Noise'),
(@SessionId2, 'Neighbor Noise'),

(@SessionId3, 'Phone Notification'),
(@SessionId3, 'Pet Movement'),
(@SessionId3, 'Traffic Noise'),
(@SessionId3, 'Neighbor Noise'),

(@SessionId4, 'Phone Notification'),
(@SessionId4, 'Pet Movement'),
(@SessionId4, 'Traffic Noise'),

(@SessionId5, 'Phone Notification'),
(@SessionId5, 'Pet Movement'),

(@SessionId6, 'Phone Notification'),
(@SessionId6, 'Pet Movement'),
(@SessionId6, 'Traffic Noise'),

(@SessionId7, 'Phone Notification'),
(@SessionId7, 'Pet Movement'),
(@SessionId7, 'Traffic Noise'),
(@SessionId7, 'Alarm Clock'),

(@SessionId8, 'Phone Notification'),
(@SessionId8, 'Pet Movement'),
(@SessionId8, 'Traffic Noise'),
(@SessionId8, 'Neighbor Noise'),

(@SessionId9, 'Phone Notification'),
(@SessionId9, 'Pet Movement'),
(@SessionId9, 'Traffic Noise'),

(@SessionId10, 'Phone Notification'),
(@SessionId10, 'Pet Movement'),

(@SessionId11, 'Phone Notification'),
(@SessionId11, 'Pet Movement'),
(@SessionId11, 'Traffic Noise'),

(@SessionId12, 'Phone Notification'),
(@SessionId12, 'Pet Movement'),
(@SessionId12, 'Traffic Noise'),
(@SessionId12, 'Neighbor Noise');

-- Insert unique Observable Objects for each session to create the desired trend
INSERT INTO [dbo].[ObservableObjects] (Title, Description, Icon, Intensity, SubType, feelingTone, SessionId) VALUES
('Traffic Noise', 'Horns and engines', 'Traffic.png', 2, 1, NULL, @SessionId1),
('Daydream', 'Future vacation plans', 'icon_daydream', 1, 6, 0, @SessionId1),

('Pet Movement', 'Pet walking around', 'icon_pet', 0, 3, NULL, @SessionId2),
('Coffee Aroma', 'Freshly brewed coffee', 'icon_coffee', 0, 2, NULL, @SessionId2),

('Anxiety', 'Worry about deadlines', 'icon_anxiety', 2, 7, 0, @SessionId3),
('Phone Vibration', 'Vibration from phone', 'icon_phone', 1, 1, NULL, @SessionId3),
('Morning Dew', 'Freshness in the air', 'icon_dew', 1, 3, NULL, @SessionId3),

('Relaxation', 'Feeling of being relaxed', 'icon_relax', 1, 7, 2, @SessionId4),
('Bird Chirping', 'Birds chirping outside', 'icon_bird', 0, 1, NULL, @SessionId4),

('Wind Chimes', 'Chimes in the wind', 'icon_windchimes', 0, 1, NULL, @SessionId5),

('Rain Sound', 'Raindrops hitting the window', 'icon_rain', 0, 1, NULL, @SessionId6),
('Creative Thoughts', 'New project ideas', 'icon_creative', 2, 6, 1, @SessionId6),

('Conversation', 'Background conversation', 'icon_conversation', 1, 1, NULL, @SessionId7),
('Temperature Change', 'Feeling of temperature change', 'icon_temp', 1, 3, NULL, @SessionId7),
('Traffic Noise', 'Horns and engines', 'Traffic.png', 2, 1, NULL, @SessionId7),

('Alarm Clock', 'Sound of an alarm clock', 'icon_alarm', 2, 1, NULL, @SessionId8),
('Meditation Focus', 'Deep meditation focus', 'icon_focus', 1, 6, 1, @SessionId8),

('Presence in Nature', 'Awareness of surroundings', 'icon_nature', 0, 1, NULL, @SessionId9),

('Emotional Calm', 'Feeling emotionally calm', 'icon_calm', 0, 7, 2, @SessionId10),

('Air Conditioner Sound', 'Hum of the AC', 'AirConditioner.png', 1, 1, NULL, @SessionId11),
('Inspiration', 'Sudden flash of inspiration', 'icon_inspiration', 2, 6, 0, @SessionId11),

('Deep Thought', 'Thinking about past events', 'DeepThought.png', 2, 6, 0, @SessionId12),
('Garden Smell', 'Fresh smell of garden', 'icon_garden', 0, 2, NULL, @SessionId12);


-- Insert dummy data into Activities
INSERT INTO Activities (Title) VALUES
('Daily Meditation'),
('Weekly Review'),
('Mindfulness Practice'),
('Breathing Exercise'),
('Yoga Session');


-- Insert dummy data into Goals
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDateTime, CompletedDateTime, ParentGoalId) VALUES
(1, 1, 1, '2024-06-01T08:00:00', '2024-06-01T09:00:00', NULL),  -- Goal 1: Daily Meditation with MeditationObjectId 1
(2, 2, 2, '2024-06-02T10:00:00', '2024-06-02T11:00:00', NULL),  -- Goal 2: Weekly Review with MeditationObjectId 2
(1, 3, NULL, '2024-06-03T07:00:00', '2024-06-03T08:00:00', NULL),  -- Goal 3: Mindfulness Practice without MeditationObjectId
(3, 4, 3, '2024-06-04T09:00:00', '2024-06-04T10:00:00', 1),  -- Goal 4: Breathing Exercise with MeditationObjectId 3, parent goal 1
(1, 5, 4, '2024-06-05T06:00:00', '2024-06-05T07:00:00', 2);  -- Goal 5: Yoga Session with MeditationObjectId 4, parent goal 2

