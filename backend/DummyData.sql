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
('Daily Meditation'),
('Weekly Review'),
('Mindfulness Practice'),
('Breathing Exercise'),
('Yoga Session');

-- Insert unique Observable Objects for each session to create the desired trend without linking to sessions
INSERT INTO [dbo].[ObservableObjects] (Title, Description, Icon, Intensity, SubType, feelingTone) VALUES
('Traffic Noise', 'Horns and engines', 'Traffic.png', 2, 1, NULL),
('Daydream', 'Future vacation plans', 'icon_daydream', 1, 6, 0),
('Pet Movement', 'Pet walking around', 'icon_pet', 0, 3, NULL),
('Coffee Aroma', 'Freshly brewed coffee', 'icon_coffee', 0, 2, NULL),
('Anxiety', 'Worry about deadlines', 'icon_anxiety', 2, 7, 0),
('Phone Vibration', 'Vibration from phone', 'icon_phone', 1, 1, NULL),
('Morning Dew', 'Freshness in the air', 'icon_dew', 1, 3, NULL),
('Relaxation', 'Feeling of being relaxed', 'icon_relax', 1, 7, 2),
('Bird Chirping', 'Birds chirping outside', 'icon_bird', 0, 1, NULL),
('Wind Chimes', 'Chimes in the wind', 'icon_windchimes', 0, 1, NULL),
('Rain Sound', 'Raindrops hitting the window', 'icon_rain', 0, 1, NULL),
('Creative Thoughts', 'New project ideas', 'icon_creative', 2, 6, 1),
('Conversation', 'Background conversation', 'icon_conversation', 1, 1, NULL),
('Temperature Change', 'Feeling of temperature change', 'icon_temp', 1, 3, NULL),
('Alarm Clock', 'Sound of an alarm clock', 'icon_alarm', 2, 1, NULL),
('Meditation Focus', 'Deep meditation focus', 'icon_focus', 1, 6, 1),
('Presence in Nature', 'Awareness of surroundings', 'icon_nature', 0, 1, NULL),
('Emotional Calm', 'Feeling emotionally calm', 'icon_calm', 0, 7, 2),
('Air Conditioner Sound', 'Hum of the AC', 'AirConditioner.png', 1, 1, NULL),
('Inspiration', 'Sudden flash of inspiration', 'icon_inspiration', 2, 6, 0),
('Deep Thought', 'Thinking about past events', 'DeepThought.png', 2, 6, 0),
('Garden Smell', 'Fresh smell of garden', 'icon_garden', 0, 2, NULL);

-- Declare MeditationObjectId variables for use in Goals and PreparationPhase
DECLARE @MeditationObjectId1 INT = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Traffic Noise');
DECLARE @MeditationObjectId2 INT = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Pet Movement');
DECLARE @MeditationObjectId3 INT = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Anxiety');
DECLARE @MeditationObjectId4 INT = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Relaxation');
DECLARE @MeditationObjectId5 INT = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Wind Chimes');

-- Insert dummy data into Goals using valid MeditationObjectId
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDateTime, CompletedDateTime, ParentGoalId) VALUES
(1, 1, @MeditationObjectId1, '2024-06-01T08:00:00', '2024-06-01T09:00:00', NULL),  -- Goal 1: Daily Meditation
(2, 2, @MeditationObjectId2, '2024-06-02T10:00:00', '2024-06-02T11:00:00', NULL),  -- Goal 2: Weekly Review
(1, 3, NULL, '2024-06-03T07:00:00', '2024-06-03T08:00:00', NULL),  -- Goal 3: Mindfulness Practice without MeditationObjectId
(3, 4, @MeditationObjectId3, '2024-06-04T09:00:00', '2024-06-04T10:00:00', 1),  -- Goal 4: Breathing Exercise, parent goal 1
(1, 5, @MeditationObjectId4, '2024-06-05T06:00:00', '2024-06-05T07:00:00', 2);  -- Goal 5: Yoga Session, parent goal 2

-- Insert dummy data into PreparationPhase using valid MeditationObjectId
INSERT INTO PreparationPhase (Duration, ActivityId, MeditationObjectId, Motivation, GoalId, Expectation, Diligence, Posture) VALUES
('00:15:00', 1, @MeditationObjectId1, 'Stay focused', 1, 'Achieve deep focus', 'High', 'Sitting'),
('00:10:00', 2, @MeditationObjectId2, 'Calm mind', 2, 'Stay relaxed', 'Medium', 'Lying down'),
('00:20:00', 3, @MeditationObjectId3, 'Deep breathing', 3, 'Improve breathing', 'High', 'Sitting'),
('00:15:00', 4, @MeditationObjectId4, 'Mindfulness', 4, 'Stay present', 'High', 'Standing'),
('00:10:00', 1, @MeditationObjectId1, 'Focus on object', 5, 'No distractions', 'Medium', 'Sitting'),
('00:20:00', 2, @MeditationObjectId2, 'Relax body', 1, 'Calmness', 'High', 'Lying down'),
('00:15:00', 3, @MeditationObjectId3, 'Concentration', 2, 'Extended focus', 'High', 'Sitting'),
('00:10:00', 4, @MeditationObjectId4, 'Body scan', 3, 'Awareness', 'Medium', 'Standing'),
('00:20:00', 1, @MeditationObjectId1, 'Breathing exercise', 4, 'Deep relaxation', 'High', 'Sitting'),
('00:15:00', 2, @MeditationObjectId2, 'Visualize', 5, 'Clear mind', 'Medium', 'Sitting'),
('00:10:00', 3, @MeditationObjectId3, 'Sound focus', 1, 'Deep listening', 'High', 'Lying down'),
('00:20:00', 4, @MeditationObjectId4, 'Awareness', 2, 'Total presence', 'High', 'Standing');

-- Insert dummy data into Sessions linked with Meditator and PreparationPhase
DECLARE @MeditatorId1 INT = (SELECT TOP 1 Id FROM Meditators WHERE Username = 'meditator1');
DECLARE @MeditatorId2 INT = (SELECT TOP 1 Id FROM Meditators WHERE Username = 'meditator2');
DECLARE @MeditatorId3 INT = (SELECT TOP 1 Id FROM Meditators WHERE Username = 'meditator3');

DECLARE @PreparationPhaseId1 INT = (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = @MeditationObjectId1);
DECLARE @PreparationPhaseId2 INT = (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = @MeditationObjectId2);
DECLARE @PreparationPhaseId3 INT = (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = @MeditationObjectId3);
DECLARE @PreparationPhaseId4 INT = (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = @MeditationObjectId4);

INSERT INTO Sessions (MeditatorId, StartTime, EndTime, PreparationPhaseId) VALUES
(@MeditatorId1, '2023-05-01T08:30:00', '2023-05-01T09:30:00', @PreparationPhaseId1),
(@MeditatorId1, '2023-05-02T07:45:00', '2023-05-02T08:45:00', @PreparationPhaseId2),
(@MeditatorId1, '2023-05-03T10:00:00', '2023-05-03T11:00:00', @PreparationPhaseId3),
(@MeditatorId1, '2023-05-04T09:15:00', '2023-05-04T10:15:00', @PreparationPhaseId4),
(@MeditatorId1, '2023-05-05T08:00:00', '2023-05-05T09:00:00', @PreparationPhaseId1),
(@MeditatorId1, '2023-05-06T07:30:00', '2023-05-06T08:30:00', @PreparationPhaseId2),
(@MeditatorId1, '2023-05-07T08:00:00', '2023-05-07T09:00:00', @PreparationPhaseId3),
(@MeditatorId1, '2023-05-08T07:00:00', '2023-05-08T08:00:00', @PreparationPhaseId4),
(@MeditatorId1, '2023-05-09T10:30:00', '2023-05-09T11:30:00', @PreparationPhaseId1),
(@MeditatorId1, '2023-05-10T09:00:00', '2023-05-10T10:00:00', @PreparationPhaseId2),
(@MeditatorId1, '2023-05-11T08:45:00', '2023-05-11T09:45:00', @PreparationPhaseId3),
(@MeditatorId1, '2023-05-12T07:15:00', '2023-05-12T08:15:00', @PreparationPhaseId4);

-- Declare session IDs for use in updates
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

-- Update Meditation Objects to link to their respective Sessions
UPDATE ObservableObjects
SET SessionId = CASE Title
    WHEN 'Traffic Noise' THEN @SessionId1
    WHEN 'Daydream' THEN @SessionId1
    WHEN 'Pet Movement' THEN @SessionId2
    WHEN 'Coffee Aroma' THEN @SessionId2
    WHEN 'Anxiety' THEN @SessionId3
    WHEN 'Phone Vibration' THEN @SessionId3
    WHEN 'Morning Dew' THEN @SessionId3
    WHEN 'Relaxation' THEN @SessionId4
    WHEN 'Bird Chirping' THEN @SessionId4
    WHEN 'Wind Chimes' THEN @SessionId5
    WHEN 'Rain Sound' THEN @SessionId6
    WHEN 'Creative Thoughts' THEN @SessionId6
    WHEN 'Conversation' THEN @SessionId7
    WHEN 'Temperature Change' THEN @SessionId7
    WHEN 'Alarm Clock' THEN @SessionId8
    WHEN 'Meditation Focus' THEN @SessionId8
    WHEN 'Presence in Nature' THEN @SessionId9
    WHEN 'Emotional Calm' THEN @SessionId10
    WHEN 'Air Conditioner Sound' THEN @SessionId11
    WHEN 'Inspiration' THEN @SessionId11
    WHEN 'Deep Thought' THEN @SessionId12
    WHEN 'Garden Smell' THEN @SessionId12
END
WHERE Title IN ('Traffic Noise', 'Daydream', 'Pet Movement', 'Coffee Aroma', 'Anxiety', 'Phone Vibration', 'Morning Dew', 'Relaxation', 'Bird Chirping', 'Wind Chimes', 'Rain Sound', 'Creative Thoughts', 'Conversation', 'Temperature Change', 'Alarm Clock', 'Meditation Focus', 'Presence in Nature', 'Emotional Calm', 'Air Conditioner Sound', 'Inspiration', 'Deep Thought', 'Garden Smell');

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
('Restlessness', 1, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Traffic Noise'))),
('Doubt', 2, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Pet Movement'))),
('Sensual Desire', 3, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Anxiety'))),
('Ill-Will', 4, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Relaxation'))),
('Sloth and Torpor', 5, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Wind Chimes'))),
('Restlessness', 1, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Bird Chirping'))),
('Doubt', 2, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Coffee Aroma'))),
('Sensual Desire', 3, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Morning Dew'))),
('Ill-Will', 4, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Creative Thoughts'))),
('Sloth and Torpor', 5, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Presence in Nature'))),
('Restlessness', 1, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Inspiration'))),
('Doubt', 2, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Deep Thought'))),
('Sensual Desire', 3, (SELECT TOP 1 Id FROM PreparationPhase WHERE MeditationObjectId = (SELECT TOP 1 Id FROM ObservableObjects WHERE Title = 'Garden Smell')));
