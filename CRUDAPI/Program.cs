using CRUDAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

string credenciais = "Host=localhost;Port=5432;Pooling=true;Database=DesafioKeevo;User Id=postgres;Password=projeto1;";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( c =>{
    c.SwaggerDoc("v1", new OpenApiInfo {Title = "Deseafio Keevo - Lista de Tarefas", Version = "v1"});
});

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<Contexto>(opcoes => opcoes.UseNpgsql(credenciais));
builder.Services.AddCors ();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json","API v1");
    });
}

app.MapGet("/", () => "Para ver a documentação da API acesse https://localhost:<porta_atual>/swagger");

app.UseHttpsRedirection();

app.UseRouting ();

app.UseCors(opcoes => opcoes.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
