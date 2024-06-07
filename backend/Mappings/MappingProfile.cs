using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTOs.Goal;
using backend.DTOs.Activity;
using backend.Models;
using backend.DTOs.ObservableObject;
using backend.DTOs.PreparationPhase;

namespace backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            // For Activities
            // ==============
            CreateMap<Activity, ActivityDTO>();
            CreateMap<ActivityDTO, Activity>();

            // For ObservableObjects
            // =====================
            CreateMap<ObservableObject, ObservableObjectDTO>();
            CreateMap<ObservableObjectDTO, ObservableObject>();

            CreateMap<PreparationPhase, CreatePreparationPhaseDTO>();
            CreateMap<CreatePreparationPhaseDTO, PreparationPhase>();

            CreateMap<ObservableObject, MeditationObjectDTO>();
            CreateMap<MeditationObjectDTO, ObservableObject>()
                .ForMember(dest => dest.ProximityToMO, opt => opt.MapFrom(src => Proximity.MeditationObject)) // Set default value for ProximityToMO
            // .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            // .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            // .ForMember(dest => dest.SubType, opt => opt.MapFrom(src => src.SubType))
            ;


            // For Goals
            // =========
            CreateMap<Goal, GoalDTO>()
            // .ForMember(dest => dest.Activity, opt => opt.MapFrom(src => src.Activity.Title))
            // .ForMember(dest => dest.MeditationObject, opt => opt.MapFrom(src => src.MeditationObject.Title))
            // .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
            ;
            CreateMap<GoalDTO, Goal>()
            // .ForPath(dest => dest.Activity.Title, opt => opt.MapFrom(src => src.Activity))
            // .ForPath(dest => dest.MeditationObject.Title, opt => opt.MapFrom(src => src.MeditationObject));
            // .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse(typeof(GoalStatus), src.Status)))
            ;

            CreateMap<Goal, CreateGoalDTO>();
            CreateMap<CreateGoalDTO, Goal>()
                .ConstructUsing(dto => new Goal()) // Ensure the default constructor is used
                .ForMember(dest => dest.Activity, opt => opt.MapFrom(
                    (src, dest, destMember, context) => context.Mapper.Map<Activity>(src.Activity))
                )
                .ForMember(dest => dest.MeditationObject, opt => opt.MapFrom(
                    (src, dest, destMember, context) => context.Mapper.Map<ObservableObject>(src.MeditationObject))
                )
                ;


        }
    }
}