# Desafio Keevo - Lista de Tarefas
Este é o um repositório para documentar meu projeto para o Desafio Full Stack Developer da empresa Keevo. O projeto consiste em uma aplicação web para gerenciar uma lista de tarefas, utilizando um frontend interativo e responsivo e um backend apropriado.
## Especificações Técnicas

- **Backend:** .NET Core
- **Frontend:** Angular
- **Banco de Dados:** Postgres
- **Persistência dos dados:** EntityFramework Core
- **Documentação da API:** Swagger
- 
## Como Navegar pelo Projeto

Este projeto está organizado em duas partes distintas: o frontend e o backend. Abaixo está uma breve descrição de cada uma delas e onde você pode encontrar os arquivos relacionados:

### Frontend (Angular 17)

Todos os arquivos relacionados ao frontend da aplicação estão localizados na pasta `Lista-De-Tarefas`. Esta pasta contém o código fonte do projeto Angular, juntamente com todos os arquivos necessários para a construção e execução da interface do usuário. Aqui estão alguns dos principais diretórios e arquivos dentro desta pasta:

- `src/app/`: Contém o código fonte principal do projeto Angular, incluindo componentes, serviços, módulos, etc.
- `angular.json`: Arquivo de configuração do Angular CLI para o projeto.
- `package.json` e `package-lock.json`: Arquivos de configuração do gerenciador de pacotes npm.

### Backend (.NET Core 8.0)

Todos os arquivos relacionados ao backend da aplicação estão localizados na pasta `CRUDAPI`. Esta pasta contém o código fonte do projeto .NET Core, juntamente com todos os arquivos necessários para a construção e execução da API. Aqui estão alguns dos principais diretórios e arquivos dentro desta pasta:

- `Controllers/`: Contém os controladores da API, que definem os endpoints e as operações HTTP.
- `Models/`: Aqui estão os modelos de dados usados pela aplicação.
- `Models/Contexto.cs`: Arquivo que define o contexto do banco de dados e configura a conexão com o Postgres.
- `Program.cs`: Arquivo principal de inicialização do aplicativo ASP.NET Core. Este arquivo substitui o antigo `Startup.cs` e contém a lógica de inicialização do aplicativo.
