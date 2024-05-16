using Arm_mo.Models;
using AutoMapper;
namespace Arm_mo.DTO
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Map the Stage class
            CreateMap<Stage, StageDTO>();
            CreateMap<StageDTO, Stage>();

            // Map the Meditator class
            CreateMap<Meditator, MeditatorDTO>()
                .ForMember(dest => dest.City, act => act.MapFrom(src => src.Address.City))
                .ForMember(dest => dest.State, act => act.MapFrom(src => src.Address.State))
                .ForMember(dest => dest.Country, act => act.MapFrom(src => src.Address.Country));

            // Map
        }
    }
}
