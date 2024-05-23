using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.Goal;
using backend.DTOs.Activity;
using backend.Models;
using backend.DTOs.ObservableObject;

namespace backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // For Goals
            // =========
            CreateMap<Goal, GoalDTO>();
                // .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => src.Activity))
                // .ForMember(dest => dest.MeditationObject, opt => opt.MapFrom(src => src.MeditationObject));
            CreateMap<GoalDTO, Goal>();

            CreateMap<Goal, CreateGoalDTO>();
            CreateMap<CreateGoalDTO, Goal>();

            // For Activities
            // ==============
            CreateMap<Activity, ActivityDTO>();
            CreateMap<ActivityDTO, Activity>();

            // For ObservableObjects
            // =====================
            CreateMap<ObservableObject, ObservableObjectDTO>();
            CreateMap<ObservableObjectDTO, ObservableObject>();
        }
    }
}