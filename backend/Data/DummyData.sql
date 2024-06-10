USE Arm_moEF3;

-- Insert dummy data into Stages this should be done before creating the meditator.
INSERT INTO Stages (Goal) VALUES
('Develop a consistent daily meditation practice.'),
('Shorten the periods of mind-wandering and extend the periods of sustained attention to the meditation object'),
('Overcome gross distraction and strong dullness.'),
('Increase the clarity and vividness of the meditation object.'),
('Sustain attention on the whole body with increased vividness and stability.'),
('Fully engage with the meditation object and maintain consistent mindfulness.'),
('Effortlessly overcome gross distractions and maintain a unified mind.'),
('Achieve effortless, continuous attention with a sense of joy and contentment.'),
('Develop mental pliancy and complete unification of mind and body.'),
('Attain deep tranquility and equanimity, free from mental and physical discomfort.');

--Make sure To create a meditator first before running the rest of this script.
DECLARE @MeditatorId1 INT = (SELECT TOP 1 Id FROM Meditators);

-- Insert dummy data into dbo.UserUsage
INSERT INTO dbo.UserUsage (UserId, Date, StartTime, UsageTime)
VALUES 
(@MeditatorId1, '2024-06-06', '08:00:00', '02:30:00'),  -- 2 hours 30 minutes
(@MeditatorId1, '2024-06-07', '07:00:00', '01:00:00'),  -- 1 hour
(@MeditatorId1, '2024-06-08', '06:30:00', '01:45:00'),  -- 1 hour 45 minutes
(@MeditatorId1, '2024-06-09', '06:45:00', '02:45:00'),  -- 2 hours 45 minutes
(@MeditatorId1, '2024-06-10', '07:30:00', '01:30:00'),  -- 1 hour 30 minutes
(@MeditatorId1, '2024-06-11', '06:15:00', '01:30:00'),  -- 1 hour 30 minutes
(@MeditatorId1, '2024-06-12', '07:45:00', '01:15:00'),  -- 1 hour 15 minutes
(@MeditatorId1, '2024-06-13', '06:45:00', '01:30:00'),  -- 1 hour 30 minutes
(@MeditatorId1, '2024-06-14', '08:45:00', '01:15:00'),  -- 1 hour 15 minutes
(@MeditatorId1, '2024-06-15', '07:00:00', '01:30:00');  -- 1 hour 30 minutes


-- Activities
INSERT INTO Activities (Title) VALUES
('Read'),
('Meditate'),
('Listen'),
('Plan'),
('Visualize');



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
('Garden Smell', 'Fresh smell of garden', 0, 2, 2);



-- Insert dummy data into PreparationPhase
INSERT INTO PreparationPhase (Duration, Motivation, Expectation, EndDateTime, StartDateTime) VALUES
('00:15:00', 'Stay focused', 'Achieve deep focus', '2024-06-06T08:15:00', '2024-06-06T08:00:00'),
('00:10:00', 'Calm mind', 'Stay relaxed', '2024-06-06T09:50:00', '2024-06-06T09:40:00'),
('00:20:00', 'Deep breathing', 'Improve breathing', '2024-06-07T07:10:00', '2024-06-07T06:50:00'),
('00:15:00', 'Mindfulness', 'Stay present', '2024-06-08T06:30:00', '2024-06-08T06:15:00'),
('00:10:00', 'Focus on object', 'No distractions', '2024-06-09T06:50:00', '2024-06-09T06:40:00'),
('00:20:00', 'Relax body', 'Calmness', '2024-06-09T08:40:00', '2024-06-09T08:20:00'),
('00:15:00', 'Concentration', 'Extended focus', '2024-06-10T07:30:00', '2024-06-10T07:15:00'),
('00:10:00', 'Body scan', 'Awareness', '2024-06-11T06:20:00', '2024-06-11T06:10:00'),
('00:20:00', 'Breathing exercise', 'Deep relaxation', '2024-06-12T07:50:00', '2024-06-12T07:30:00'),
('00:15:00', 'Visualize', 'Clear mind', '2024-06-13T06:55:00', '2024-06-13T06:40:00'),
('00:10:00', 'Sound focus', 'Deep listening', '2024-06-14T08:50:00', '2024-06-14T08:40:00'),
('00:20:00', 'Awareness', 'Total presence', '2024-06-15T07:05:00', '2024-06-15T06:45:00');



-- Insert dummy data into Sessions with valid PreparationPhaseId


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

INSERT INTO Sessions (MeditatorId, StartDateTime, EndDateTime, PreparationPhaseId) VALUES
(@MeditatorId1, '2024-06-06T08:30:00', '2024-06-06T09:30:00', @PreparationPhaseId1),
(@MeditatorId1, '2024-06-06T10:00:00', '2024-06-06T11:15:00', @PreparationPhaseId2),
(@MeditatorId1, '2024-06-07T07:30:00', '2024-06-07T08:10:00', @PreparationPhaseId3),
(@MeditatorId1, '2024-06-08T06:45:00', '2024-06-08T08:00:00', @PreparationPhaseId4),
(@MeditatorId1, '2024-06-09T07:00:00', '2024-06-09T08:32:00', @PreparationPhaseId5),
(@MeditatorId1, '2024-06-09T09:00:00', '2024-06-09T09:45:00', @PreparationPhaseId6),
(@MeditatorId1, '2024-06-10T07:45:00', '2024-06-10T08:45:00', @PreparationPhaseId7),
(@MeditatorId1, '2024-06-11T06:30:00', '2024-06-11T07:30:00', @PreparationPhaseId8),
(@MeditatorId1, '2024-06-12T08:00:00', '2024-06-12T08:40:00', @PreparationPhaseId9),
(@MeditatorId1, '2024-06-13T07:00:00', '2024-06-13T07:50:00', @PreparationPhaseId10),
(@MeditatorId1, '2024-06-14T09:00:00', '2024-06-14T09:45:00', @PreparationPhaseId11),
(@MeditatorId1, '2024-06-15T07:15:00', '2024-06-15T08:00:00', @PreparationPhaseId12);


-- Preparation Phase 1
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('12 Rules for Life', 'Reading material: Understanding fundamental principles of life', 2, 6, 3, 1);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = '12 Rules for Life'), '2024-06-01', '2024-06-01');

DECLARE @ParentGoalId1 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = '12 Rules for Life'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('12 Rules for Life - Page 10', 'Reading material: Understanding discipline and routine', 2, 6, 3, 1), 
('12 Rules for Life - Page 11', 'Reading material: Exploring the concept of order and chaos', 2, 6, 3, 1);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 10'), '2024-06-01', '2024-06-01', @ParentGoalId1, @PreparationPhaseId1), 
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 11'), '2024-06-01', '2024-06-01', @ParentGoalId1, @PreparationPhaseId1);

-- Preparation Phase 2
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Guided Meditation', 'Meditation guide: Techniques for mindfulness and relaxation', 0, 7, 3, 2);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Guided Meditation'), '2024-06-03', '2024-06-03');

DECLARE @ParentGoalId2 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Guided Meditation'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Guided Meditation Session 1', 'Meditation guide: First session focusing on breathing techniques', 0, 7, 3, 2), 
('Guided Meditation Session 2', 'Meditation guide: Second session focusing on body scan', 0, 7, 3, 2);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Guided Meditation Session 1'), '2024-06-03', '2024-06-03', @ParentGoalId2, @PreparationPhaseId2),  
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Guided Meditation Session 2'), '2024-06-03', '2024-06-03', @ParentGoalId2, @PreparationPhaseId2);

-- Preparation Phase 3
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Huberman Lab Podcast', 'Listening material: Neuroscience insights and practical advice', 0, 6, 3, 3);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'Huberman Lab Podcast'), '2024-06-05', '2024-06-05');

DECLARE @ParentGoalId3 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Huberman Lab Podcast'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Huberman Lab Podcast Episode 1', 'Listening material: Insights on improving sleep', 0, 6, 3, 3), 
('Huberman Lab Podcast Episode 2', 'Listening material: Strategies for enhancing focus', 0, 6, 3, 3);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'Huberman Lab Podcast Episode 1'), '2024-06-05', '2024-06-05', @ParentGoalId3, @PreparationPhaseId3),  
(1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'Huberman Lab Podcast Episode 2'), '2024-06-05', '2024-06-05', @ParentGoalId3, @PreparationPhaseId3);

-- Preparation Phase 4
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Advanced Guided Meditation', 'Meditation guide: Techniques for deepening mindfulness', 0, 7, 3, 4);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Guided Meditation'), '2024-06-07', '2024-06-07');

DECLARE @ParentGoalId4 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Guided Meditation'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Advanced Meditation Session 1', 'Meditation guide: First session on visualization', 0, 7, 3, 4), 
('Advanced Meditation Session 2', 'Meditation guide: Second session on loving-kindness', 0, 7, 3, 4);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Meditation Session 1'), '2024-06-07', '2024-06-07', @ParentGoalId4, @PreparationPhaseId4),  
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Meditation Session 2'), '2024-06-07', '2024-06-07', @ParentGoalId4, @PreparationPhaseId4);

-- Preparation Phase 5 and 11
IF NOT EXISTS (SELECT 1 FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'The Tim Ferriss Show'))
BEGIN
    INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
    ('The Tim Ferriss Show', 'Listening material: Interviews with high achievers', 0, 6, 3, 5);
    INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
    (1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'The Tim Ferriss Show'), '2024-06-09', '2024-06-09');
END

DECLARE @ParentGoalId5 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'The Tim Ferriss Show'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Tim Ferriss Show Episode 1', 'Listening material: Interview with a successful entrepreneur', 0, 6, 3, 5), 
('Tim Ferriss Show Episode 2', 'Listening material: Health and wellness strategies', 0, 6, 3, 5);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'Tim Ferriss Show Episode 1'), '2024-06-09', '2024-06-09', @ParentGoalId5, @PreparationPhaseId5),  
(1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'Tim Ferriss Show Episode 2'), '2024-06-09', '2024-06-09', @ParentGoalId5, @PreparationPhaseId5);

INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Tim Ferriss Show Episode 5', 'Listening material: Productivity hacks from experts', 0, 6, 3, 11), 
('Tim Ferriss Show Episode 6', 'Listening material: Overcoming challenges and setbacks', 0, 6, 3, 11);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'Tim Ferriss Show Episode 5'), '2024-06-21', '2024-06-21', @ParentGoalId5, @PreparationPhaseId11),  
(1, (SELECT Id FROM Activities WHERE Title = 'Listen'), (SELECT Id FROM ObservableObjects WHERE Title = 'Tim Ferriss Show Episode 6'), '2024-06-21', '2024-06-21', @ParentGoalId5, @PreparationPhaseId11);

-- Preparation Phase 6
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Hunger Games', 'Reading material: Analyzing themes of survival and society', 2, 6, 3, 6);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = 'Hunger Games'), '2024-06-11', '2024-06-11');

DECLARE @ParentGoalId6 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Hunger Games'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Hunger Games - Page 54', 'Reading material: Conflict and strategy in the arena', 2, 6, 3, 6), 
('Hunger Games - Page 55', 'Reading material: Emotional struggles and alliances', 2, 6, 3, 6);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = 'Hunger Games - Page 54'), '2024-06-11', '2024-06-11', @ParentGoalId6, @PreparationPhaseId6),  
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = 'Hunger Games - Page 55'), '2024-06-11', '2024-06-11', @ParentGoalId6, @PreparationPhaseId6);

-- Preparation Phase 7
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Weekly Planner', 'Planning material: Organizing tasks and priorities for the week', 1, 7, 3, 7);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Plan'), (SELECT Id FROM ObservableObjects WHERE Title = 'Weekly Planner'), '2024-06-13', '2024-06-13');

DECLARE @ParentGoalId7 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Weekly Planner'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Weekly Planner Day 1', 'Planning material: Tasks and priorities for Monday', 1, 7, 3, 7), 
('Weekly Planner Day 2', 'Planning material: Tasks and priorities for Tuesday', 1, 7, 3, 7);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Plan'), (SELECT Id FROM ObservableObjects WHERE Title = 'Weekly Planner Day 1'), '2024-06-13', '2024-06-13', @ParentGoalId7, @PreparationPhaseId7),  
(1, (SELECT Id FROM Activities WHERE Title = 'Plan'), (SELECT Id FROM ObservableObjects WHERE Title = 'Weekly Planner Day 2'), '2024-06-13', '2024-06-13', @ParentGoalId7, @PreparationPhaseId7);

-- Preparation Phase 8
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Visualization Guide', 'Visualizing material: Techniques for mental imagery and focus', 0, 7, 3, 8);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Visualize'), (SELECT Id FROM ObservableObjects WHERE Title = 'Visualization Guide'), '2024-06-15', '2024-06-15');

DECLARE @ParentGoalId8 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Visualization Guide'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Visualization Guide Part 1', 'Visualizing material: Creating vivid mental images', 0, 7, 3, 8), 
('Visualization Guide Part 2', 'Visualizing material: Enhancing focus and clarity', 0, 7, 3, 8);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Visualize'), (SELECT Id FROM ObservableObjects WHERE Title = 'Visualization Guide Part 1'), '2024-06-15', '2024-06-15', @ParentGoalId8, @PreparationPhaseId8),  
(1, (SELECT Id FROM Activities WHERE Title = 'Visualize'), (SELECT Id FROM ObservableObjects WHERE Title = 'Visualization Guide Part 2'), '2024-06-15', '2024-06-15', @ParentGoalId8, @PreparationPhaseId8);

-- Preparation Phase 9
DECLARE @ParentGoalId9 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = '12 Rules for Life'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('12 Rules for Life - Page 12', 'Reading material: Analyzing self-improvement and growth', 2, 6, 3, 9), 
('12 Rules for Life - Page 13', 'Reading material: Exploring the importance of responsibility', 2, 6, 3, 9);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 12'), '2024-06-17', '2024-06-17', @ParentGoalId9, @PreparationPhaseId9),  
(1, (SELECT Id FROM Activities WHERE Title = 'Read'), (SELECT Id FROM ObservableObjects WHERE Title = '12 Rules for Life - Page 13'), '2024-06-17', '2024-06-17', @ParentGoalId9, @PreparationPhaseId9);

-- Preparation Phase 10
DECLARE @ParentGoalId10 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Guided Meditation'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Advanced Meditation Session 5', 'Meditation guide: Fifth session focusing on mindful walking', 0, 7, 3, 10), 
('Advanced Meditation Session 6', 'Meditation guide: Sixth session focusing on compassion', 0, 7, 3, 10);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Meditation Session 5'), '2024-06-19', '2024-06-19', @ParentGoalId10, @PreparationPhaseId10),  
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Meditation Session 6'), '2024-06-19', '2024-06-19', @ParentGoalId10, @PreparationPhaseId10);

-- Preparation Phase 12
DECLARE @ParentGoalId12 INT = (SELECT Id FROM Goals WHERE MeditationObjectId = (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Guided Meditation'));
INSERT INTO ObservableObjects (Title, Description, Intensity, SubType, ProximityToMO, SessionId) VALUES
('Advanced Meditation Session 7', 'Meditation guide: Seventh session focusing on mindful eating', 0, 7, 3, 12), 
('Advanced Meditation Session 8', 'Meditation guide: Eighth session focusing on breath awareness', 0, 7, 3, 12);
INSERT INTO Goals (Status, ActivityId, MeditationObjectId, DueDate, CompletedDate, ParentGoalId, PreparationPhaseId) VALUES
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Meditation Session 7'), '2024-06-23', '2024-06-23', @ParentGoalId12, @PreparationPhaseId12),  
(1, (SELECT Id FROM Activities WHERE Title = 'Meditate'), (SELECT Id FROM ObservableObjects WHERE Title = 'Advanced Meditation Session 8'), '2024-06-23', '2024-06-23', @ParentGoalId12, @PreparationPhaseId12);

-- Declare session IDs for use in update
DECLARE @SessionId1 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-06T08:30:00');
DECLARE @SessionId2 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-06T10:00:00');
DECLARE @SessionId3 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-07T07:30:00');
DECLARE @SessionId4 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-08T06:45:00');
DECLARE @SessionId5 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-09T07:00:00');
DECLARE @SessionId6 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-09T09:00:00');
DECLARE @SessionId7 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-10T07:45:00');
DECLARE @SessionId8 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-11T06:30:00');
DECLARE @SessionId9 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-12T08:00:00');
DECLARE @SessionId10 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-13T07:00:00');
DECLARE @SessionId11 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-14T09:00:00');
DECLARE @SessionId12 INT = (SELECT TOP 1 Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartDateTime = '2024-06-15T07:15:00');

-- Update Observable Objects to link to their respective Sessions for sessions 9 to 12, including the newly created meditation objects
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
    WHEN 'Presence in Nature' THEN @SessionId9
    WHEN 'Wind Chimes' THEN @SessionId10
    WHEN 'Emotional Calm' THEN @SessionId10
    WHEN 'Rain Sound' THEN @SessionId11
    WHEN 'Air Conditioner Sound' THEN @SessionId11
    WHEN 'Inspiration' THEN @SessionId11
    WHEN 'Creative Thoughts' THEN @SessionId12
    WHEN 'Deep Thought' THEN @SessionId12
    WHEN 'Garden Smell' THEN @SessionId12
END
WHERE Title IN ('Traffic Noise', 'Daydream', 'Pet Movement', 'Coffee Aroma', 'Anxiety', 'Phone Vibration', 'Morning Dew', 'Relaxation', 'Bird Chirping', 'Presence in Nature', 'Wind Chimes', 'Emotional Calm', 'Rain Sound', 'Air Conditioner Sound', 'Inspiration', 'Creative Thoughts', 'Deep Thought', 'Garden Smell', '12 Rules for Life - Page 10', 'Weekly Review Notes', 'Guided Meditation', 'Podcast Episode 5', 'Breathing Exercise', 'Morning Exercise Routine', 'Reflective Journal', 'Weekly Planner', 'Discussion Points', 'Visualization Guide', 'Analysis Report');

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
(@SessionId8, 4, @MeditatorId1),
(@SessionId9, 1, @MeditatorId1),
(@SessionId9, 3, @MeditatorId1),
(@SessionId10, 1, @MeditatorId1),
(@SessionId10, 2, @MeditatorId1),
(@SessionId11, 2, @MeditatorId1),
(@SessionId11, 3, @MeditatorId1),
(@SessionId12, 1, @MeditatorId1),
(@SessionId12, 3, @MeditatorId1),
(@SessionId12, 4, @MeditatorId1);

-- Insert unique NewlyMasteredStages ensuring no duplicate mastery within a session and in ascending order
INSERT INTO NewlyMasteredStage (SessionId, StageId) VALUES
(@SessionId1, 1),  -- Session 1: Mastering Stage 1
(@SessionId2, 2),  -- Session 2: Mastering Stage 2
(@SessionId5, 3),  -- Session 5: Mastering Stage 3
(@SessionId12, 4);  -- Session 12: Mastering Stage 4

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
