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
                "Creating practice routines",
                "Setting specific practice goals",
                "Generating strong motivation",
                "Cultivating discipline and diligence",
                "Reinforcing spontaneous introspective awareness and learning to sustain attention on the meditation object. Spontaneous introspective awareness is the 'aha' moment when you suddenly realize there’s a disconnect between what you wanted to do (watch the breath) and what you’re actually doing (thinking about something else). Appreciating this moment causes it to happen faster and faster, so the periods of mind-wandering get shorter and shorter.",
                "Use the techniques of following the breath and connecting to extend the periods of uninterrupted attention, and become familiar with how forgetting happens"
            };

            var skillAssociations = new List<(int SkillID, int StageID)>
            {
                (1, 1),
                (2, 1),
                (3, 1),
                (4, 1),
                (5, 2),
                (6, 3)
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
                "Sleepiness"
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
                (11, 3)
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
                "Put all your effort into forming and holding a conscious intention to sit down and meditate for a set period every day, and practice diligently for the duration of the sit",
                "Appreciate the “aha” moment that recognizes mind-wandering, while gently but firmly redirecting attention back to the breath. Then, intend to engage with the breath as fully as possible without losing peripheral awareness.",
                "Invoke introspective attention frequently, before you’ve forgotten the breath or fallen asleep, and make corrections as soon as you notice distractions or dullness. Also, intend to sustain peripheral awareness while engaging with the breath as fully as possible."
            };

            var intentionAssociations = new List<(int IntentionID, int StageID)>
            {
                (1, 1),
                (2, 2),
                (3, 3)
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
                "I never miss a daily practice session.",
                "I do not procrastinate while meditating.",
                "I can sustain attention on the meditation object for 10-15 minutes.",
                "Most periods of mind-wandering last only a few seconds.",
                "I rarely forget the breath or fall asleep."
            };


            var masteryRequirementsAssociations = new List<(int MasteryRequirementID, int StageID)>
            {
                (1, 1),
                (2, 1),
                (3, 2),
                (4, 2),
                (5, 3)
            };

            return masteryRequirementsAssociations
                .Where(a => a.StageID == stageId)
                .Select(a => allMasteryRequirements[a.MasteryRequirementID - 1])
                .ToList();
        }

    }
}