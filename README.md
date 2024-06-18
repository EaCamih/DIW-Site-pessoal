# Site pessoal DIW

Este projeto visa a criação de um site que mostra informações de um usuário específico do GitHub e seus repositórios públicos.
Algumas notas devem serem tomadas para que o sistema funcione sem erros.

## Em script.js e repo.js
```javascript
  const my_token = 'GITHUB_TOKEN';
```

Altere este token para seu token da API do GitHub para evitar erros de Rate Limit da API.



## Em script.js
```javascript
  const user = 'EaCamih';
```

Altere o user para o username do usuário no GitHub que quer mostrar as informações.

## Estilizando com tailwind

Este projeto usa a estilização customizada usando o TailWindCss, para inicar e alterar qualquer classe comece com
```bash
  npm install
  npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

Para alterar as classes do tailwind acesse o arquivo `./src/input.css`, lá será lido e gerado um `./src/output.css` automaticamente se o comando acima está sendo executado de forma correta.
