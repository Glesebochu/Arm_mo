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

-- Insert dummy data into Activities
INSERT INTO Activities (Title) VALUES
('Read'),
('Write'),
('Meditate'),
('Listen'),
('Practice'),
('Review'),
('Exercise'),
('Reflect'),
('Plan'),
('Discuss'),
('Visualize'),
('Analyze');


-- Insert unique Observable Objects without linking to sessions
INSERT INTO [dbo].[ObservableObjects] (Title, Description, Intensity, SubType, ProximityToMO) VALUES
('Traffic Noise', 'Horns and engines', 2, 1, 0),
('Daydream', 'Future vacation plans', 1, 6, 1),
('Pet Movement', 'Pet walking around', 0, 3, 0),
('Coffee Aroma', 'Freshly brewed coffee', 0, 2, 2),
('Anxiety', 'Worry about deadlines', 2, 7, 1),
('Phone Vibration', 'Vibration from phone', 1, 1, 0),
('Morning Dew', 'Freshness in the air', 1, 3, 2),
('Relaxation', 'Feeling of being relaxed', 1, 7, 2),
('Bird Chirping', 'Birds chirping outside', 0, 1, 0),
('Wind Chimes', 'Chimes in the wind', 0, 1, 0),
('Rain Sound', 'Raindrops hitting the window', 0, 1, 1),
('Creative Thoughts', 'New project ideas', 2, 6, 1),
('Conversation', 'Background conversation', 1, 1, 0),
('Temperature Change', 'Feeling of temperature change', 1, 3, 2),
('Alarm Clock', 'Sound of an alarm clock', 2, 1, 0),
('Meditation Focus', 'Deep meditation focus', 1, 6, 1),
('Presence in Nature', 'Awareness of surroundings', 0, 1, 2),
('Emotional Calm', 'Feeling emotionally calm', 0, 7, 2),
('Air Conditioner Sound', 'Hum of the AC', 1, 1, 0),
('Inspiration', 'Sudden flash of inspiration', 2, 6, 1),
('Deep Thought', 'Thinking about past events', 2, 6, 0),
('Garden Smell', 'Fresh smell of garden', 0, 2, 2),
('12 Rules for Life - Page 10', 'Reading material', 2, 1, 0), -- Read
('Daily Journal', 'Writing material', 1, 6, 1), -- Write
('Guided Meditation', 'Meditation guide', 0, 3, 0), -- Meditate
('Podcast Episode 5', 'Listening material', 0, 2, 2), -- Listen
('Breathing Exercise', 'Practice material', 2, 7, 1), -- Practice
('Weekly Review Notes', 'Review material', 1, 1, 0), -- Review
('Morning Exercise Routine', 'Exercise material', 2, 7, 1), -- Exercise
('Reflective Journal', 'Reflecting material', 1, 6, 1), -- Reflect
('Weekly Planner', 'Planning material', 1, 1, 0), -- Plan
('Discussion Points', 'Discussing material', 1, 1, 0), -- Discuss
('Visualization Guide', 'Visualizing material', 0, 3, 0), -- Visualize
('Analysis Report', 'Analyzing material', 2, 6, 1); -- Analyze



-- Insert dummy data into PreparationPhase with valid MeditationObjectId and corresponding ActivityId
INSERT INTO PreparationPhase (Duration, Motivation, Expectation, EndDateTime, StartDateTime) VALUES
('00:15:00', 'Stay focused', 'Achieve deep focus', '2024-06-01T09:00:00', '2024-06-01T08:00:00'),
('00:10:00', 'Calm mind', 'Stay relaxed', '2024-06-02T11:00:00', '2024-06-02T10:00:00'),
('00:20:00', 'Deep breathing', 'Improve breathing', '2024-06-03T08:00:00', '2024-06-03T07:00:00'),
('00:15:00', 'Mindfulness', 'Stay present', '2024-06-04T10:00:00', '2024-06-04T09:00:00'),
('00:10:00', 'Focus on object', 'No distractions', '2024-06-05T07:00:00', '2024-06-05T06:00:00'),
('00:20:00', 'Relax body', 'Calmness', '2024-06-01T09:00:00', '2024-06-01T08:00:00'),
('00:15:00', 'Concentration', 'Extended focus', '2024-06-02T11:00:00', '2024-06-02T10:00:00'),
('00:10:00', 'Body scan', 'Awareness', '2024-06-03T08:00:00', '2024-06-03T07:00:00'),
('00:20:00', 'Breathing exercise', 'Deep relaxation', '2024-06-04T10:00:00', '2024-06-04T09:00:00'),
('00:15:00', 'Visualize', 'Clear mind', '2024-06-05T07:00:00', '2024-06-05T06:00:00'),
('00:10:00', 'Sound focus', 'Deep listening', '2024-06-01T09:00:00', '2024-06-01T08:00:00'),
('00:20:00', 'Awareness', 'Total presence', '2024-06-02T11:00:00', '2024-06-02T10:00:00');

-- Insert dummy data into Sessions with valid PreparationPhaseId
DECLARE @MeditatorId1 INT = (SELECT TOP 1 Id FROM Meditators);

DECLARE @PreparationPhaseId1 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:15:00' AND Motivation = 'Stay focused');
DECLARE @PreparationPhaseId2 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:10:00' AND Motivation = 'Calm mind');
DECLARE @PreparationPhaseId3 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:20:00' AND Motivation = 'Deep breathing');
DECLARE @PreparationPhaseId4 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:15:00' AND Motivation = 'Mindfulness');
DECLARE @PreparationPhaseId5 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:10:00' AND Motivation = 'Focus on object');
DECLARE @PreparationPhaseId6 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:20:00' AND Motivation = 'Relax body');
DECLARE @PreparationPhaseId7 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:15:00' AND Motivation = 'Concentration');
DECLARE @PreparationPhaseId8 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:10:00' AND Motivation = 'Body scan');
DECLARE @PreparationPhaseId9 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:20:00' AND Motivation = 'Breathing exercise');
DECLARE @PreparationPhaseId10 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:15:00' AND Motivation = 'Visualize');
DECLARE @PreparationPhaseId11 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:10:00' AND Motivation = 'Sound focus');
DECLARE @PreparationPhaseId12 INT = (SELECT Id FROM PreparationPhase WHERE Duration = '00:20:00' AND Motivation = 'Awareness');

-- Insert dummy data into Goals using valid MeditationObjectId and PreparationPhaseId
-- Preparation Phase 1
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, 1, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 10'), '2024-06-01', '2024-06-01', NULL, @PreparationPhaseId1),  -- Goal 1: Read (Parent Goal for PreparationPhaseId1)
(3, 6, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Weekly Review Notes'), '2024-06-02', '2024-06-02', 1, @PreparationPhaseId1),  -- Child Goal of Goal 1

-- Preparation Phase 2
(2, 3, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Guided Meditation'), '2024-06-03', '2024-06-03', NULL, @PreparationPhaseId2),  -- Goal 2: Meditate (Parent Goal for PreparationPhaseId2)
(1, 5, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Breathing Exercise'), '2024-06-04', '2024-06-04', 2, @PreparationPhaseId2),  -- Child Goal of Goal 2

-- Preparation Phase 3
(1, 4, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Podcast Episode 5'), '2024-06-05', '2024-06-05', NULL, @PreparationPhaseId3),  -- Goal 3: Listen (Parent Goal for PreparationPhaseId3)
(1, 1, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 10'), '2024-06-06', '2024-06-06', 3, @PreparationPhaseId3),  -- Child Goal of Goal 3

-- Preparation Phase 4
(1, 3, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Guided Meditation'), '2024-06-07', '2024-06-07', NULL, @PreparationPhaseId4),  -- Goal 4: Meditate (Parent Goal for PreparationPhaseId4)
(2, 5, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Breathing Exercise'), '2024-06-08', '2024-06-08', 4, @PreparationPhaseId4),  -- Child Goal of Goal 4

-- Preparation Phase 5
(1, 4, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Podcast Episode 5'), '2024-06-09', '2024-06-09', NULL, @PreparationPhaseId5),  -- Goal 5: Listen (Parent Goal for PreparationPhaseId5)
(1, 1, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 10'), '2024-06-10', '2024-06-10', 5, @PreparationPhaseId5),  -- Child Goal of Goal 5

-- Preparation Phase 6
(1, 7, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Morning Exercise Routine'), '2024-06-11', '2024-06-11', NULL, @PreparationPhaseId6),  -- Goal 6: Exercise (Parent Goal for PreparationPhaseId6)
(2, 8, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Reflective Journal'), '2024-06-12', '2024-06-12', 6, @PreparationPhaseId6),  -- Child Goal of Goal 6

-- Preparation Phase 7
(1, 9, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Weekly Planner'), '2024-06-13', '2024-06-13', NULL, @PreparationPhaseId7),  -- Goal 7: Plan (Parent Goal for PreparationPhaseId7)
(2, 10, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Discussion Points'), '2024-06-14', '2024-06-14', 7, @PreparationPhaseId7),  -- Child Goal of Goal 7

-- Preparation Phase 8
(1, 11, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Visualization Guide'), '2024-06-15', '2024-06-15', NULL, @PreparationPhaseId8),  -- Goal 8: Visualize (Parent Goal for PreparationPhaseId8)
(2, 12, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Analysis Report'), '2024-06-16', '2024-06-16', 8, @PreparationPhaseId8),  -- Child Goal of Goal 8

-- Preparation Phase 9
(1, 1, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 10'), '2024-06-17', '2024-06-17', NULL, @PreparationPhaseId9),  -- Goal 9: Read (Parent Goal for PreparationPhaseId9)
(3, 6, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Weekly Review Notes'), '2024-06-18', '2024-06-18', 9, @PreparationPhaseId9),  -- Child Goal of Goal 9

-- Preparation Phase 10
(2, 3, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Guided Meditation'), '2024-06-19', '2024-06-19', NULL, @PreparationPhaseId10),  -- Goal 10: Meditate (Parent Goal for PreparationPhaseId10)
(1, 5, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Breathing Exercise'), '2024-06-20', '2024-06-20', 10, @PreparationPhaseId10),  -- Child Goal of Goal 10

-- Preparation Phase 11
(1, 4, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Podcast Episode 5'), '2024-06-21', '2024-06-21', NULL, @PreparationPhaseId11),  -- Goal 11: Listen (Parent Goal for PreparationPhaseId11)
(1, 1, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 10'), '2024-06-22', '2024-06-22', 11, @PreparationPhaseId11),  -- Child Goal of Goal 11

-- Preparation Phase 12
(1, 3, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Guided Meditation'), '2024-06-23', '2024-06-23', NULL, @PreparationPhaseId12),  -- Goal 12: Meditate (Parent Goal for PreparationPhaseId12)
(2, 5, (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Breathing Exercise'), '2024-06-24', '2024-06-24', 12, @PreparationPhaseId12);  -- Child Goal of Goal 12

INSERT INTO Sessions (MeditatorId, StartDateTime, EndDateTime, PreparationPhaseId) VALUES
(@MeditatorId1, '2023-05-01T08:30:00', '2023-05-01T09:40:00', @PreparationPhaseId1),
(@MeditatorId1, '2023-05-02T07:45:00', '2023-05-02T09:45:00', @PreparationPhaseId2),
(@MeditatorId1, '2023-05-03T10:00:00', '2023-05-03T10:30:00', @PreparationPhaseId3),
(@MeditatorId1, '2023-05-04T09:15:00', '2023-05-04T10:20:00', @PreparationPhaseId4),
(@MeditatorId1, '2023-05-05T08:00:00', '2023-05-05T09:00:00', @PreparationPhaseId5),
(@MeditatorId1, '2023-05-06T07:30:00', '2023-05-06T08:36:00', @PreparationPhaseId6),
(@MeditatorId1, '2023-05-07T08:00:00', '2023-05-07T10:30:00', @PreparationPhaseId7),
(@MeditatorId1, '2023-05-08T07:00:00', '2023-05-08T08:10:00', @PreparationPhaseId8),
(@MeditatorId1, '2023-05-09T10:30:00', '2023-05-09T11:30:00', @PreparationPhaseId9),
(@MeditatorId1, '2023-05-10T09:00:00', '2023-05-10T09:10:00', @PreparationPhaseId10),
(@MeditatorId1, '2023-05-11T08:45:00', '2023-05-11T09:40:00', @PreparationPhaseId11),
(@MeditatorId1, '2023-05-12T07:15:00', '2023-05-12T08:10:00', @PreparationPhaseId12);

-- Declare session IDs for use in updates
DECLARE @SessionId1 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-01T08:30:00');
DECLARE @SessionId2 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-02T07:45:00');
DECLARE @SessionId3 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-03T10:00:00');
DECLARE @SessionId4 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-04T09:15:00');
DECLARE @SessionId5 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-05T08:00:00');
DECLARE @SessionId6 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-06T07:30:00');
DECLARE @SessionId7 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-07T08:00:00');
DECLARE @SessionId8 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-08T07:00:00');
DECLARE @SessionId9 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-09T10:30:00');
DECLARE @SessionId10 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-10T09:00:00');
DECLARE @SessionId11 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-11T08:45:00');
DECLARE @SessionId12 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2023-05-12T07:15:00');

-- Update Observable Objects to link to their respective Sessions
UPDATE ObservableObjects
SET SessionId = CASE Title
    WHEN 'Traffic Noise' THEN @SessionId1
    WHEN 'Daydream' THEN @SessionId5
    WHEN 'Pet Movement' THEN @SessionId2
    WHEN 'Coffee Aroma' THEN @SessionId6
    WHEN 'Anxiety' THEN @SessionId3
    WHEN 'Phone Vibration' THEN @SessionId7
    WHEN 'Morning Dew' THEN @SessionId8
    WHEN 'Relaxation' THEN @SessionId4
    WHEN 'Bird Chirping' THEN @SessionId9
    WHEN 'Wind Chimes' THEN @SessionId10
    WHEN 'Rain Sound' THEN @SessionId11
    WHEN 'Creative Thoughts' THEN @SessionId12
    WHEN 'Conversation' THEN @SessionId3
    WHEN 'Temperature Change' THEN @SessionId7
    WHEN 'Alarm Clock' THEN @SessionId8
    WHEN 'Meditation Focus' THEN @SessionId8
    WHEN 'Presence in Nature' THEN @SessionId9
    WHEN 'Emotional Calm' THEN @SessionId10
    WHEN 'Air Conditioner Sound' THEN @SessionId11
    WHEN 'Inspiration' THEN @SessionId11
    WHEN 'Deep Thought' THEN @SessionId12
    WHEN 'Garden Smell' THEN @SessionId12
    WHEN '12 Rules for Life - Page 10' THEN @SessionId1
    WHEN 'Weekly Review Notes' THEN @SessionId2
    WHEN 'Guided Meditation' THEN @SessionId3
    WHEN 'Podcast Episode 5' THEN @SessionId4
    WHEN 'Breathing Exercise' THEN @SessionId5
    WHEN 'Morning Exercise Routine' THEN @SessionId6
    WHEN 'Reflective Journal' THEN @SessionId6
    WHEN 'Weekly Planner' THEN @SessionId7
    WHEN 'Discussion Points' THEN @SessionId7
    WHEN 'Visualization Guide' THEN @SessionId8
    WHEN 'Analysis Report' THEN @SessionId8
END
WHERE Title IN ('Traffic Noise', 'Daydream', 'Pet Movement', 'Coffee Aroma', 'Anxiety', 'Phone Vibration', 'Morning Dew', 'Relaxation', 'Bird Chirping', 'Wind Chimes', 'Rain Sound', 'Creative Thoughts', 'Conversation', 'Temperature Change', 'Alarm Clock', 'Meditation Focus', 'Presence in Nature', 'Emotional Calm', 'Air Conditioner Sound', 'Inspiration', 'Deep Thought', 'Garden Smell', '12 Rules for Life - Page 10', 'Weekly Review Notes', 'Guided Meditation', 'Podcast Episode 5', 'Breathing Exercise', 'Morning Exercise Routine', 'Reflective Journal', 'Weekly Planner', 'Discussion Points', 'Visualization Guide', 'Analysis Report');

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

(@SessionId2, 'Neighbor Noise'),
(@SessionId2, 'Bird Chirping'),
(@SessionId2, 'Traffic Noise'),
(@SessionId2, 'Wind Blowing'),

(@SessionId3, 'Phone Notification'),
(@SessionId3, 'Pet Movement'),
(@SessionId3, 'Car Alarm'),
(@SessionId3, 'Bird Chirping'),

(@SessionId4, 'Wind Chimes'),
(@SessionId4, 'Neighbor Noise'),
(@SessionId4, 'Traffic Noise'),

(@SessionId5, 'Bird Chirping'),
(@SessionId5, 'Pet Movement'),

(@SessionId6, 'Phone Notification'),
(@SessionId6, 'Wind Blowing'),
(@SessionId6, 'Traffic Noise'),

(@SessionId7, 'Neighbor Noise'),
(@SessionId7, 'Pet Movement'),
(@SessionId7, 'Alarm Clock'),
(@SessionId7, 'Construction Noise'),

(@SessionId8, 'Phone Notification'),
(@SessionId8, 'Wind Chimes'),
(@SessionId8, 'Bird Chirping'),
(@SessionId8, 'Car Alarm'),

(@SessionId9, 'Construction Noise'),
(@SessionId9, 'Pet Movement'),
(@SessionId9, 'Traffic Noise'),

(@SessionId10, 'Bird Chirping'),
(@SessionId10, 'Wind Blowing'),

(@SessionId11, 'Neighbor Noise'),
(@SessionId11, 'Car Alarm'),
(@SessionId11, 'Traffic Noise'),

(@SessionId12, 'Phone Notification'),
(@SessionId12, 'Pet Movement'),
(@SessionId12, 'Traffic Noise'),
(@SessionId12, 'Wind Blowing');

-- Insert dummy data into Hindrance table
INSERT INTO Hindrance (Title, Type, PreparationPhaseId) VALUES
('Restlessness', 1, @PreparationPhaseId1),
('Doubt', 2, @PreparationPhaseId2),
('Sensual Desire', 3, @PreparationPhaseId3),
('Ill-Will', 4, @PreparationPhaseId4),
('Sloth and Torpor', 5, @PreparationPhaseId5),
('Restlessness', 1, @PreparationPhaseId6),
('Doubt', 2, @PreparationPhaseId7),
('Sensual Desire', 3, @PreparationPhaseId8),
('Ill-Will', 4, @PreparationPhaseId9),
('Sloth and Torpor', 5, @PreparationPhaseId10),
('Restlessness', 1, @PreparationPhaseId11),
('Doubt', 2, @PreparationPhaseId12);
