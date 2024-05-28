using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Goal;
using backend.Models;


namespace backend.Interfaces
{
    public interface IGoalRepository
    {
        Task<List<Goal>> GetAllAsync(QueryObject query);
        Task<Goal?> GetByIdAsync(int id);
        Task<Goal?> GetBySymbolAsync(string symbol);
        Task<Goal> CreateAsync(Goal goal);
        Task<Goal?> UpdateAsync(int id, GoalDTO goalDTO);
        Task<Goal?> DeleteAsync(int id);
        Task<bool> GoalExists(int id);
    }

    public class QueryObject
    {
    }
}