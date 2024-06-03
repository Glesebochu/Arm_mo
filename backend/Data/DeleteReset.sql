USE [Arm_mo]
GO

-- Disable foreign key constraints to allow deletion
ALTER TABLE [dbo].[Meditators] NOCHECK CONSTRAINT [FK_Meditators_Addresses_AddressId]
ALTER TABLE [dbo].[Goals] NOCHECK CONSTRAINT [FK_Goals_Activities_ActivityId]
ALTER TABLE [dbo].[Goals] NOCHECK CONSTRAINT [FK_Goals_Goals_ParentGoalId]
ALTER TABLE [dbo].[Goals] NOCHECK CONSTRAINT [FK_Goals_ObservableObjects_MeditationObjectId]

-- Delete data from all tables
DELETE FROM [dbo].[Goals]
DELETE FROM [dbo].[Addresses]
DELETE FROM [dbo].[ObservableObjects]
DELETE FROM [dbo].[Activities]
DELETE FROM [dbo].[Meditators]
DELETE FROM [dbo].[Stages]
DELETE FROM [dbo].[__EFMigrationsHistory]

-- Reset primary key values
DBCC CHECKIDENT ('[dbo].[Goals]', RESEED, 0)
DBCC CHECKIDENT ('[dbo].[Addresses]', RESEED, 0)
DBCC CHECKIDENT ('[dbo].[ObservableObjects]', RESEED, 0)
DBCC CHECKIDENT ('[dbo].[Activities]', RESEED, 0)
DBCC CHECKIDENT ('[dbo].[Meditators]', RESEED, 0)
DBCC CHECKIDENT ('[dbo].[Stages]', RESEED, 0)

-- Enable foreign key constraints again
ALTER TABLE [dbo].[Meditators] CHECK CONSTRAINT [FK_Meditators_Addresses_AddressId]
ALTER TABLE [dbo].[Goals] CHECK CONSTRAINT [FK_Goals_Activities_ActivityId]
ALTER TABLE [dbo].[Goals] CHECK CONSTRAINT [FK_Goals_Goals_ParentGoalId]
ALTER TABLE [dbo].[Goals] CHECK CONSTRAINT [FK_Goals_ObservableObjects_MeditationObjectId]

GO
