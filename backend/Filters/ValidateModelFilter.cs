using Microsoft.AspNetCore.Mvc;

public static class CustomModelStateResponseFactory
{
    public static IActionResult InvalidModelStateResponse(ActionContext context)
    {
        var errors = context.ModelState.Values
                                    .SelectMany(v => v.Errors)
                                    .Select(e => e.ErrorMessage)
                                    .ToList();

        return new BadRequestObjectResult(errors);
    }
}


