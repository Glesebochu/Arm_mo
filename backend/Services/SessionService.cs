using backend.Data;
using backend.Models;
using backend.DTOs;
using backend.DTOs.Session;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace backend.Services
{
    public class SessionService
    {
        private readonly Arm_moContext _context;
        private readonly IMapper _mapper;

        public SessionService(Arm_moContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Stage?> GetStageAsync(int stageId)
        {
            return await _context.Stages
                .Where(s => s.Id == stageId)
                .FirstOrDefaultAsync();
        }

        public async Task<Session> CreateSessionAsync(CreateSessionDTO createSessionDTO)
        {
            var session = new Session
            {
                StartDateTime = createSessionDTO.StartDateTime,
                EndDateTime = createSessionDTO.EndDateTime,
                Meditator = await _context.Meditators.FindAsync(createSessionDTO.MeditatorId),
                AhaMoments = _mapper.Map<List<AhaMoment>>(createSessionDTO.AhaMoments),
                ObservableObjects = _mapper.Map<List<ObservableObject>>(createSessionDTO.ObservableObjects),
                PreparationPhase = _mapper.Map<PreparationPhase>(createSessionDTO.PreparationPhase),
                IsDeleted = createSessionDTO.IsDeleted
            };

            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            // Add PracticedStages
            if (createSessionDTO.PracticedStageIds != null)
            {
                foreach (var stageId in createSessionDTO.PracticedStageIds)
                {
                    var stage = await GetStageAsync(stageId);
                    if (stage != null)
                    {
                        var practicedStage = new PracticedStage
                        {
                            SessionId = session.Id,
                            Session = session,
                            Stage = stage,
                            StageId = stageId,
                        };
                        _context.PracticedStages.Add(practicedStage);
                    }
                }
            }

            // Add NewlyMasteredStages
            if (createSessionDTO.NewlyMasteredStageIds != null)
            {
                foreach (var stageId in createSessionDTO.NewlyMasteredStageIds)
                {
                    var stage = await GetStageAsync(stageId);
                    if (stage != null)
                    {
                        var newlyMasteredStage = new NewlyMasteredStage
                        {
                            SessionId = session.Id,
                            Stage = stage,
                            StageId = stageId
                        };
                        _context.NewlyMasteredStages.Add(newlyMasteredStage);
                    }
                }
            }

            await _context.SaveChangesAsync();

            session.PracticedStages = await _context.PracticedStages
                .Where(ps => ps.SessionId == session.Id).ToListAsync();
            session.NewlyMasterdStages = await _context.NewlyMasteredStages
                .Where(nms => nms.SessionId == session.Id).ToListAsync();

            _context.Sessions.Update(session);
            await _context.SaveChangesAsync();

            return session;
        }
    }
}
