Um projeto com um feed de mensagens, semelhante ao twitter, porém muito mais simples.

Para fazer o setup do projeto, primeiro entre na pasta 'web', e digite os seguintes comandos:
  npm install 
  npm run dev
  
Se tudo der certo, o site estará rodando, porém sem o backend, então não vai funcionar, agora é a hora de fazer o setup do backend.
Entre na pasta 'server' e digite o seguinte comando:
  npm install

Se você tentar rodar 'npm run dev', não vai funcionar porque estamos sem o banco de dados, então vamos criá-lo. Digite o seguinte comando: 
  npx prisma migrate dev

Com esse comando, dizemos para o banco gerar as tabelas e criar o banco em si, e após isso podemos rodar o comando:
  npm run dev

E agora, com ambos 'server' e 'web' rodando, podemos aproveitar a aplicação, então crie uma conta e faça o teste!
