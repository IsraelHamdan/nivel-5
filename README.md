# Livraria Full-Stack

## Como instalar as dependencias do projeto e fazer ele funcionar

Primeiro, é necessário ter o Node.js instalado na maquina, de prefência que ele esteja atualizado para versão mais recente (atualmente a 20.10.0 LTS, eu estou usando a versão 18.16.1 LTS). Depois de ter o Node.js instalado na máquina, é só seguir o passo a passo

- **Vá até a pasta nivel-5**
  ![Pasta do projeto no explorador de arquivos](/imagens//pasta-do-projeto.png)
- **Clique com o botão direito do mouse em qualquer área livre e tente achar a opção abrir no terminal ou git bash here**
  ![Página do terminal](/imagens//pagina-do-terminal-na-pasta-do-nivel-5.png)
- **Digite o comando cd para mudar para dentro da pasta React**

- **Instalando as dependências dos projetos** angular, react e next, pra isso, é só dentro da pasta de cada um digitar o comando `npm install` ou se vc preferir `yarn install` segue a lista de prints:
  ![proejeto React](/imagens//entrando-na-pasta-do-react.png)

## Tecnologias Utilizadas

### Frontend

- **Typescript**
- **React**
- **Next**
- **Angular**

### Backend

- **Javascript**
- **Express**
- **Nodemon** (dependência de desenvolvimento)
- **CORS**
- **Express Generator**

## Gerenciadores de Pacotes

- **Yarn**
- **npm**

## Imagens do Projeto

![arvore de arquivos do projeto](/imagens//arvore-de-arquivos-do-projeto.png)

### Testando metodos na API

![testando metodos de requisição da api, metodo GET](/imagens//metodo-get.png)
![testando metodos de requisição da api, metodo POST](/imagens//metodo-post%20.png)
![testando metodos de requisição da api, metodo DELETE](/imagens//metodo-delete.png)

### Layout dos projetos:

#### Angular:

      ** Página da lista de livros: **
          ![lista de livros](/imagens//pagina-da-lista-de-livros.png)
      ** Página de cadastro de livros: **
          ![cadastrando um livro](/imagens//pagina-de-cadastro.png)

#### React

      ** Página da lista de livros
        ![lista de livros](/imagens//lista-de-livros-react.png)
      ** Página de cadastro de livros: **
        ![cadastrando um livro](/imagens//pagina-de-cadastro.png)

#### Next

      ** Página da lista de livros
        ![lista de livros](/imagens//lista-de-livros-react.png)
      ** Página de cadastro de livros: **
        ![cadastrando um livro](/imagens//pagina-de-cadastro-next.png)

## Desafios no Desenvolvimento

Durante o desenvolvimento deste projeto, enfrentei alguns desafios que contribuíram para o meu aprendizado e aprimoramento técnico:

1. **Conexão com o Banco de Dados:** Enfrentei dificuldades na configuração da conexão com o banco de dados, sendo um ponto crítico para o funcionamento adequado da aplicação.

2. **Configuração da API e Rotas:** A configuração da API e o estabelecimento de rotas também foram desafios, demandando tempo e esforço para garantir a integridade e eficiência do sistema.

3. **Reaproveitamento de Código:** Enfrentei certos obstáculos no reaproveitamento de código, mas consegui superar as dificuldades, implementando práticas que otimizaram a manutenção e escalabilidade do projeto.

4. **Problemas com Requisitos do SWAY:** Alguns requisitos do SWAY causaram mais problemas do que soluções, sendo necessário encontrar alternativas para garantir a eficiência e coerência do código.

## Modificações Necessárias

Durante o desenvolvimento, algumas modificações foram necessárias para atender a requisitos específicos e melhorar a estrutura do projeto:

1. **Padronização de Atributos:** Foi necessário ajustar a padronização de atributos, como a definição de dois atributos que representavam a mesma informação, `_id` e `codigo`. Essa padronização facilitou a compreensão e manutenção do código.

2. **Importação de Interfaces:** Realizei modificações para importar a interface `Livro` previamente construída, evitando a recriação desnecessária e promovendo um código mais limpo e modular.

## Espaço para Imagens