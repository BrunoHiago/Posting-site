<h1 align="center">BlogApp</h1>


<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Feito%20com-Node.js-green" alt="Feito com Node.js">
  </a>
  <a href="https://handlebarsjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Template-Handlebars-blue" alt="Template Handlebars">
  </a>
</p>

<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#recursos">Recursos</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#como-usar">Como Usar</a> •
  <a href="#contribuição">Contribuição</a> •
  <a href="#licença">Licença</a>
</p>

## Sobre

Este é o meu site de postagens desenvolvido em Node.js com o uso do template Handlebars. Ele possui um sistema de login que permite aos usuários fazerem login, criar postagens e interagir com outras funcionalidades do site.

## Recursos

- Autenticação de usuários com sistema de login
- Criação, leitura, atualização e exclusão de postagens ao admin
- Visualização de postagens em ordem cronológica
- Páginas de perfil de usuário
- Interface de usuário responsiva


## Instalação

1. Clone este repositório:
```
git clone https://github.com/BrunoHiago/Posting-site.git
```
2. Navegue até o diretório do projeto: 
```
cd Posting-site
```
3. Instale as dependências: 
```
npm install
```

## Como Usar

1. Inicie o servidor: 
```
npm start
```

2. Abra o navegador e acesse 
```
http://localhost:8081
```
3. Faça login com sua conta de usuário ou crie uma nova conta
4. Crie, leia, atualize e exclua postagens usando as funcionalidades do site. Para criar, atualizar e excluir sua conta, é necessário ser um administrador, o qual pode ser configurado diretamente no banco de dados, atualizando o campo `isAdmin` para 1.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorar o projeto.

## Licença

Este projeto é licenciado sob a Licença MIT.
