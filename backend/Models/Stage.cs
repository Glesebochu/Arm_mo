using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    public class Stage
    {
        public int Id { get; set; }
        public string Goal { get; set; }

        [NotMapped]
        public List<string> Intentions { get; set; }

        [NotMapped]
        public List<string> Obstacles { get; set; }

        [NotMapped]
        public List<string> Skills { get; set; }

        [NotMapped]
        public List<string> MasteryRequirements { get; set; }

        public Stage()
        {
            Intentions = new List<string>();
            Obstacles = new List<string>();
            Skills = new List<string>();
            MasteryRequirements = new List<string>();
        }

        public static List<string> GetSkillsForStage(int stageId)
        {
            var allSkills = new List<string>
            {
                // Skills for stages 1 to 3
                "Creating practice routines",
                "Setting specific practice goals",
                "Generating strong motivation",
                "Cultivating discipline and diligence",
                "Reinforcing spontaneous introspective awareness and learning to sustain attention on the meditation object. Spontaneous introspective awareness is the 'aha' moment when you suddenly realize there’s a disconnect between what you wanted to do (watch the breath) and what you’re actually doing (thinking about something else). Appreciating this moment causes it to happen faster and faster, so the periods of mind-wandering get shorter and shorter.",
                "Use the techniques of following the breath and connecting to extend the periods of uninterrupted attention, and become familiar with how forgetting happens",
                // Skills for stages 4 to 10
                "Detecting and overcoming subtle dullness",
                "Sustaining attention on the whole body with increased vividness and stability",
                "Fully engaging with the meditation object and maintaining consistent mindfulness",
                "Overcoming gross and subtle distractions effortlessly",
                "Achieving unification of mind and continuous attention",
                "Experiencing effortless sustained attention and joy",
                "Cultivating mental pliancy and complete unification of mind",
                "Attaining mental and physical pliancy with deep tranquility",
                "Developing equanimity and insight into the nature of reality"
            };

            var skillAssociations = new List<(int SkillID, int StageID)>
            {
                (1, 1),
                (2, 1),
                (3, 1),
                (4, 1),
                (5, 2),
                (6, 3),
                // Associations for stages 4 to 10
                (7, 4),
                (8, 5),
                (9, 6),
                (10, 7),
                (11, 8),
                (12, 9),
                (13, 10)
            };

            return skillAssociations
                .Where(a => a.StageID == stageId)
                .Select(a => allSkills[a.SkillID - 1])
                .ToList();
        }

        public static List<string> GetObstaclesForStage(int stageId)
        {
            var allObstacles = new List<string>
            {
                // Obstacles for stages 1 to 3
                "Procrastination",
                "Fatigue",
                "Resistance",
                "Impatience",
                "Boredom",
                "Lack of motivation",
                "Mind-wandering",
                "Monkey-mind",
                "Distractions",
                "Forgetting",
                "Sleepiness",
                // Obstacles for stages 4 to 10
                "Subtle dullness",
                "Subtle distractions",
                "Inconsistent mindfulness",
                "Gross distractions",
                "Effortful attention",
                "Lack of joy",
                "Mental rigidity",
                "Physical discomfort",
                "Lack of equanimity"
            };

            var obstacleAssociations = new List<(int ObstacleID, int StageID)>
            {
                (1, 1),
                (2, 1),
                (3, 1),
                (4, 1),
                (5, 1),
                (6, 1),
                (7, 2),
                (8, 2),
                (4, 2),
                (9, 3),
                (10, 3),
                (7, 3),
                (11, 3),
                // Associations for stages 4 to 10
                (12, 4),
                (13, 5),
                (14, 6),
                (15, 7),
                (16, 8),
                (17, 9),
                (18, 10)
            };

            return obstacleAssociations
                .Where(a => a.StageID == stageId)
                .Select(a => allObstacles[a.ObstacleID - 1])
                .ToList();
        }

        public static List<string> GetIntentionsForStage(int stageId)
        {
            var allIntentions = new List<string>
            {
                // Intentions for stages 1 to 3
                "Put all your effort into forming and holding a conscious intention to sit down and meditate for a set period every day, and practice diligently for the duration of the sit",
                "Appreciate the “aha” moment that recognizes mind-wandering, while gently but firmly redirecting attention back to the breath. Then, intend to engage with the breath as fully as possible without losing peripheral awareness.",
                "Invoke introspective attention frequently, before you’ve forgotten the breath or fallen asleep, and make corrections as soon as you notice distractions or dullness. Also, intend to sustain peripheral awareness while engaging with the breath as fully as possible.",
                // Intentions for stages 4 to 10
                "Recognize and overcome subtle dullness by increasing the vividness and clarity of the meditation object",
                "Maintain continuous, stable attention on the whole body, noticing even subtle distractions",
                "Fully engage with the meditation object, ensuring that mindfulness is continuous and uninterrupted",
                "Effortlessly overcome gross distractions and maintain a unified mind",
                "Achieve effortless, continuous attention with a sense of joy and contentment",
                "Develop mental pliancy and complete unification of mind and body",
                "Attain deep tranquility and equanimity, free from mental and physical discomfort",
                "Cultivate insight into the nature of reality and maintain equanimity in all situations"
            };

            var intentionAssociations = new List<(int IntentionID, int StageID)>
            {
                (1, 1),
                (2, 2),
                (3, 3),
                // Associations for stages 4 to 10
                (4, 4),
                (5, 5),
                (6, 6),
                (7, 7),
                (8, 8),
                (9, 9),
                (10, 10)
            };

            return intentionAssociations
                .Where(a => a.StageID == stageId)
                .Select(a => allIntentions[a.IntentionID - 1])
                .ToList();
        }

        public static List<string> GetMasteryRequirementsForStage(int stageId)
        {
            var allMasteryRequirements = new List<string>
            {
                // Mastery requirements for stages 1 to 3
                "I never miss a daily practice session.",
                "I do not procrastinate while meditating.",
                "I can sustain attention on the meditation object for 10-15 minutes.",
                "Most periods of mind-wandering last only a few seconds.",
                "I rarely forget the breath or fall asleep.",
                // Mastery requirements for stages 4 to 10
                "I can recognize and overcome subtle dullness consistently.",
                "I can maintain continuous attention on the whole body with vividness and stability.",
                "My mindfulness is continuous and uninterrupted during meditation.",
                "I can overcome gross distractions effortlessly and maintain a unified mind.",
                "My attention is effortless and sustained, accompanied by a sense of joy.",
                "I have developed mental and physical pliancy and can achieve deep tranquility.",
                "I maintain equanimity and have insight into the nature of reality in all situations."
            };

            var masteryRequirementsAssociations = new List<(int MasteryRequirementID, int StageID)>
            {
                (1, 1),
                (2, 1),
                (3, 2),
                (4, 2),
                (5, 3),
                // Associations for stages 4 to 10
                (6, 4),
                (7, 5),
                (8, 6),
                (9, 7),
                (10, 8),
                (11, 9),
                (12, 10)
            };

            return masteryRequirementsAssociations
                .Where(a => a.StageID == stageId)
                .Select(a => allMasteryRequirements[a.MasteryRequirementID - 1])
                .ToList();
        }

    }
}
