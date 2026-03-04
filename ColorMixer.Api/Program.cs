var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.MapGet("/health", () => Results.Ok("OK"));
app.MapPost("/mix", (MixRequest request) =>
{
    var color1 = ParseHex(request.Color1);
    var color2 = ParseHex(request.Color2);

    var resultR = (color1.R + color2.R) / 2;
    var resultG = (color1.G + color2.G) / 2;
    var resultB = (color1.B + color2.B) / 2;

    var resultHex = $"#{resultR:X2}{resultG:X2}{resultB:X2}";

    return Results.Ok(new MixResponse(resultHex));
});

app.Run("http://0.0.0.0:8080");

static (int R, int G, int B) ParseHex(string hex)
{
    hex = hex.TrimStart('#');
    if (hex.Length == 3)
    {
        return (
            Convert.ToInt32(new string(hex[0], 2), 16),
            Convert.ToInt32(new string(hex[1], 2), 16),
            Convert.ToInt32(new string(hex[2], 2), 16)
        );
    }
    return (
        Convert.ToInt32(hex.Substring(0, 2), 16),
        Convert.ToInt32(hex.Substring(2, 2), 16),
        Convert.ToInt32(hex.Substring(4, 2), 16)
    );
}

public record MixRequest(string Color1, string Color2);
public record MixResponse(string Result);

