# Desafio Keevo - Lista de Tarefas
Este é o um repositório para documentar meu projeto para o Desafio Full Stack Developer da empresa Keevo. O projeto consiste em uma aplicação web para gerenciar uma lista de tarefas, utilizando um frontend interativo e responsivo e um backend apropriado.
## Especificações Técnicas

- **Backend:** .NET Core
- **Frontend:** Angular
- **Banco de Dados:** Postgres
- **Persistência dos dados:** EntityFramework Core
- **Documentação da API:** Swagger
  
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

## Executando a aplicação
Seguem algumas instruções para auxiliar a executar tanto o frontend quanto o backend desse projeto, após fazer a clonagem deste repositório.

### PostgreSQL e pgAdmin 4
- Antes de mais nada, é importante que você tenha o PostgreSQL e sua ferramenta pgAdmin 4 instalada em sua máquina para que o backend da aplicação funcione corretamente. Você pode fazer o download de ambos em: https://www.postgresql.org/
- Durante a instalação, será preciso definir uma porta para o serviço e uma senha. Guarde o número da porta e a senha escolhidos, pois serão necessários futuramente.
- Após o termino da instalação, abra o pgAdmin e expanda a aba Servers, expanda a aba PostgreSQL, clique com o botão direito em Databases e crie um novo banco de dados. Dê um nome ao banco e guarde esse nome.
- IMAGEM AQUI
### Criando o banco de dados em sua máquina
- Primeiramente, certifique-se de ter o .NET 8.0 ou superior instalado em sua máquina (https://dotnet.microsoft.com/pt-br/download)
- A partir do diretório principal do projeto, navegue até a pasta `CRUDAPI` e abra o arquivo `Program.cs` para edição
- Com o `Program.cs` aberto, agora será necessário inserir as credenciais de acesso ao banco de dados que você criou no pgAdmin para que as tabelas da aplicação sejam criadas nele automaticamente durante a inicialização. Para isso, procure a variável `string credenciais` que estará localizada na linha 7 do arquivo `Program.cs` e substitua seu valor pelo seguinte texto: `"Host=localhost;Port=SuaPorta;Pooling=true;Database=SuaBase;User Id=postgres;Password=SuaSenha;"` no qual `SuaPorta` é o numero da porta que você definiu durante a instalação do postgresql, `SuaBase` é nome da base que você criou usando o pgAdmin, e `SuaSenha` é a senha que você definiu durante a instalação do postgreSQL
- Finalmente, com o pgAdmin aberto, abra um terminal e navegue até o diretório `CRUDAPI` para executar os seguintes comandos em ordem `dotnet ef migrations add criacaoBD` e `dotnet ef database update`
- Agora o banco de dados já deve possuir todas as tabelas necessárias para ser devidamente utilizado pela aplicação
### Executando o backend
- Ainda com seu terminal no diretório `CRUDAPI`, execute o comando `dotnet run` colocar o backend em execução
- Se a execução for bem-sucedida, você verá em seu terminal uma mensagem como essa: `Now listening on: http://localhost:5278` (Lembrando que o número da porta pode ser diferente para você)
- Você pode adionar `/swagger` no link do item anterior para acessar a documentação da api feita com o Swagger. Por exemplo: `http://localhost:5278/swagger`
- Mantenha esse terminal aberto pois ambos frontend e backend devem estar em execução ao mesmo tempo para que a aplicação funcione corretamente
### Executando o frontend
- Certifique-se de ter o Angular 17 ou superior instalado em seu sistema. Você pode encontrar as instruções para instalar o Angular em: https://angular.io/guide/setup-local
- Note que para utilizar o Angular é preciso já ter o nodeJS e o npm packet manager instalados em sua máquina
- Para executar o frontend, abra um terminal (diferente do que está rodando o backend) e navegue até o diretório `Lista-De-Tarefas` e execute o comando `ng serve`
- Após isso você poderá utilizar a aplicação acessando `http://localhost:4200` em seu navegador ou acessando o link que aparecerá em seu terminal após a execução bem-sucedida do comando `ng serve`
- Lembrando novamente que é de suma importância que o frontend e o backend estejam rodando ao mesmo tempo em terminais separados
