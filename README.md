# Projeto de teclado virtual

Este projeto consiste numa primeira implementação sobre algoritmos avançados, se trata de uma tentativa de tornar o ato de acessar uma conta mais seguro, através de criptografia e etapas de validação mais complexas.

## Tecnologias escolhidas

#### Front

Para o *front-end* foram escolhidos:
- Typescript
- React (Nextjs 15)
- Tailwindcss (4^)
- Eslint
- Prettier
- HeroUI (antiga NextUI)

#### Back

Já para o *back-end* foram escolhidos:
- Typescript
- Nodejs (Nestjs)
- Typeorm
- SQLite
- Prettier
- Eslint

### Das decisões

React/Typescript/Next/Tailwind são meu "go-to" do font, eu adoro trabalhar com essas tecnologias e me sinto confortável codando nelas e por isso as escolhi.
HeroUI veio como uma luva a calhar em minhas mãos, criando componentes rapidamente e sem tanto esforço, é legal que podemos importar componentes específicos ao invés de importar a lib inteira, o que mantém o controle sobre as dependências do projeto maior também.

No back foi onde me desafiei, nunca havia mexido com Node e Nest, apenas trabalhado com Python e principalmente Java para projetos de serviços e APIs. Como gosto da linguagem do javascript (especialmente cm o TS por cima) decidi dar uma chance para validar como seria programar em outra linguagem.
Optei por Nest porque o logo é mais bonito que o logo do Express.js e porque soa como Next.
Typeorm foi uma indicação do ChatGPT e SQLite foi uma opção prática e rápida para banco de dados.

##### Sobre as tecnologias do serviço

Achei legal, mas honestamente ainda prefiro Java (não acredito que estou dizendo isso).

## Como rodar

Clone o projeto na sua máquina com o comando:<br>
> `git clone https://github.com/ofofomat/virtual_keyboard.git`


Após isso, abra dois terminais, acesse a pasta `/virtual_keyboard` em ambos. Em um deles, siga o comando `cd back-end` para acessar a pasta dos serviços, no outro `cd front-end` para acessar a pasta das telas.
<br>
No primeiro, digite `npm run start` e no segundo `npm run dev`.
<br>
Abra o navegador e acesse o URL **http://localhost:3000** e você esterá na aplicação! Digite seu nome de usuário (*mock_user*) e digite sua senha (*4,6,7,3,4,9*). Clique em acessar e _TA DÃ_, você conseguiu! 😊
<br>
Caso queira brincar diretamente com os endpoints, acesse **http://localhost:9000**.