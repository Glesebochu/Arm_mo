USE Arm_moEF3;

-- Insert dummy data into Stagea
INSERT INTO Stages (Goal) VALUES
('Develop a consistent daily meditation practice.'),
('Shorten the periods of mind-wandering and extend the periods of sustained attention to the meditation object'),
('Overcome gross distraction and strong dullness.');


-- Insert dummy data into Meditator
INSERT INTO Meditators(CurrentStageId, Username, FirstName, LastName, _password) VALUES
(1, 'meditator1', 'John', 'Doe', 'password1'),
(2, 'meditator2', 'Jane', 'Smith', 'password2'),
(3, 'meditator3', 'Jim', 'Beam', 'password3');

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
(1, '2024-05-27', '18:00:00', '00:30:00');  -- 30 minutes


-- Insert dummy data into Session linked with Meditator
DECLARE @MeditatorId1 INT = (SELECT Id FROM Meditators WHERE Username = 'meditator1');
DECLARE @MeditatorId2 INT = (SELECT Id FROM Meditators WHERE Username = 'meditator2');
DECLARE @MeditatorId3 INT = (SELECT Id FROM Meditators WHERE Username = 'meditator3');

INSERT INTO Sessions (MeditatorId, StartTime, EndTime) VALUES
(@MeditatorId1, '2023-05-01T08:30:00', '2023-05-01T09:30:00'),
(@MeditatorId1, '2023-05-02T07:45:00', '2023-05-02T08:45:00'),
(@MeditatorId1, '2023-05-03T10:00:00', '2023-05-03T11:00:00'),
(@MeditatorId1, '2023-05-04T09:15:00', '2023-05-04T10:15:00'),
(@MeditatorId1, '2023-05-05T08:00:00', '2023-05-05T09:00:00'),
(@MeditatorId1, '2023-05-06T07:30:00', '2023-05-06T08:30:00');

-- Declare session IDs for use in inserts
DECLARE @SessionId1 INT = (SELECT Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-01T08:30:00');
DECLARE @SessionId2 INT = (SELECT Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-02T07:45:00');
DECLARE @SessionId3 INT = (SELECT Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-03T10:00:00');
DECLARE @SessionId4 INT = (SELECT Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-04T09:15:00');
DECLARE @SessionId5 INT = (SELECT Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-05T08:00:00');
DECLARE @SessionId6 INT = (SELECT Id FROM Sessions WHERE MeditatorId = @MeditatorId1 AND StartTime = '2023-05-06T07:30:00');

-- Insert varied AhaMoments into different sessions
INSERT INTO AhaMoments (SessionId, Label) VALUES
(@SessionId1, 'Phone Notification'),
(@SessionId1, 'Phone Notification'),
(@SessionId1, 'Pet Movement'),
(@SessionId1, 'Traffic Noise'),
(@SessionId2, 'Phone Notification'),
(@SessionId2, 'Phone Notification'),
(@SessionId2, 'Phone Call'),
(@SessionId2, 'Doorbell Sound'),
(@SessionId2, 'Pet Movement'),
(@SessionId3, 'Phone Notification'),
(@SessionId3, 'Pet Movement'),
(@SessionId3, 'Neighbor Noise'),
(@SessionId3, 'Alarm Clock'),
(@SessionId3, 'Phone Notification'),
(@SessionId4, 'Phone Notification'),
(@SessionId4, 'Phone Notification'),
(@SessionId4, 'Neighbor Noise'),
(@SessionId4, 'Doorbell Sound'),
(@SessionId5, 'Phone Notification');

-- Insert unique PracticedStages for each session
INSERT INTO PracticedStage (SessionId, StageId) VALUES
(@SessionId1, 1),
(@SessionId1, 2),
(@SessionId2, 1),
(@SessionId2, 2),
(@SessionId3, 2),
(@SessionId3, 3),
(@SessionId4, 1),
(@SessionId4, 2),
(@SessionId5, 2),
(@SessionId5, 3),
(@SessionId6, 1),
(@SessionId6, 3);

-- Insert unique NewlyMasteredStages ensuring no duplicate mastery within a session and in ascending order
INSERT INTO NewlyMasteredStage (SessionId, StageId) VALUES
(@SessionId1, 1),  -- Session 1: Mastering Stage 1
(@SessionId2, 2),  -- Session 2: Mastering Stage 2
(@SessionId5, 3);  -- Session 5: Mastering Stage 3

-- Insert unique Observable Objects for each session
INSERT INTO [dbo].[ObservableObjects] (Title, Description, Icon, Intensity, Type, SubType, mentalState, feelingTone, SessionId) VALUES
('Traffic Noise', 'Horns and engines', 'icon_traffic', 2, 1, 1, NULL, NULL, @SessionId1),
('Daydream', 'Future vacation plans', 'icon_daydream', 1, 0, 6, 0, 0, @SessionId1),
('Doorbell Sound', 'A sudden doorbell ringing', 'icon_doorbell', 1, 1, 1, NULL, NULL, @SessionId1),
('Pet Movement', 'Pet walking around', 'icon_pet', 0, 1, 3, NULL, NULL, @SessionId1),
('Coffee Aroma', 'Freshly brewed coffee', 'icon_coffee', 0, 1, 2, NULL, NULL, @SessionId2),
('Anxiety', 'Worry about deadlines', 'icon_anxiety', 2, 0, 7, 2, 0, @SessionId2),
('Phone Vibration', 'Vibration from phone', 'icon_phone', 1, 1, 1, NULL, NULL, @SessionId2),
('Neighbor Noise', 'Noise from neighbors', 'icon_neighbor', 1, 1, 1, NULL, NULL, @SessionId2),
('Morning Dew', 'Freshness in the air', 'icon_dew', 1, 1, 3, NULL, NULL, @SessionId3),
('Relaxation', 'Feeling of being relaxed', 'icon_relax', 1, 0, 7, 0, 2, @SessionId3),
('Bird Chirping', 'Birds chirping outside', 'icon_bird', 0, 1, 1, NULL, NULL, @SessionId3),
('Wind Chimes', 'Chimes in the wind', 'icon_windchimes', 0, 1, 1, NULL, NULL, @SessionId3),
('Rain Sound', 'Raindrops hitting the window', 'icon_rain', 0, 1, 1, NULL, NULL, @SessionId4),
('Creative Thoughts', 'New project ideas', 'icon_creative', 2, 0, 6, 1, 1, @SessionId4),
('Conversation', 'Background conversation', 'icon_conversation', 1, 1, 1, NULL, NULL, @SessionId4),
('Temperature Change', 'Feeling of temperature change', 'icon_temp', 1, 1, 3, NULL, NULL, @SessionId4),
('Alarm Clock', 'Sound of an alarm clock', 'icon_alarm', 2, 1, 1, NULL, NULL, @SessionId5),
('Meditation Focus', 'Deep meditation focus', 'icon_focus', 1, 0, 6, 0, 1, @SessionId5),
('Presence in Nature', 'Awareness of surroundings', 'icon_nature', 0, 1, 1, NULL, NULL, @SessionId5),
('Emotional Calm', 'Feeling emotionally calm', 'icon_calm', 0, 0, 7, 1, 2, @SessionId5),
('Air Conditioner Sound', 'Hum of the AC', 'icon_ac', 1, 1, 1, NULL, NULL, @SessionId6),
('Inspiration', 'Sudden flash of inspiration', 'icon_inspiration', 2, 0, 6, 1, 0, @SessionId6),
('Traffic Noise', 'Sound of distant traffic', 'icon_traffic', 1, 1, 1, NULL, NULL, @SessionId6),
('Deep Thought', 'Thinking about past events', 'icon_deepthought', 2, 0, 6, 2, 0, @SessionId6);


