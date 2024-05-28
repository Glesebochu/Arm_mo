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
            CreateMap<Goal, GoalDTO>()
                .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => src.Activity.Title))
                .ForMember(dest => dest.MeditationObject, opt => opt.MapFrom(src => src.MeditationObject.Title))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
            CreateMap<GoalDTO, Goal>()
                .ForPath(dest => dest.Activity.Title, opt => opt.MapFrom(src => src.Activity))
                .ForPath(dest => dest.MeditationObject.Title, opt => opt.MapFrom(src => src.MeditationObject))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse(typeof(GoalStatus), src.Status)));

            CreateMap<Goal, CreateGoalDTO>()
                .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => src.Activity.Title))
                .ForMember(dest => dest.MeditationObject, opt => opt.MapFrom(src => src.MeditationObject.Title));
            CreateMap<CreateGoalDTO, Goal>()
                .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => new Activity { Title = src.Activity }))
                .ForMember(dest => dest.MeditationObject, opt => opt.MapFrom(src => new ObservableObject { Title = src.MeditationObject }));
            // .AfterMap((src, dest) =>
            // {
            //     if (dest.Activity == null) dest.Activity = new Activity();
            //     if (dest.MeditationObject == null) dest.MeditationObject = new ObservableObject();
            // });

            CreateMap<Goal, GoalDTOId>();
            CreateMap<GoalDTOId, Goal>();

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