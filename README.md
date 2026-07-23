# Sulflux — Tela de Login

Interface de autenticação (login, cadastro e recuperação de senha) para a plataforma Sulflux, um sistema de monitoramento agrícola com análise de carbono e hídrica de propriedades rurais.

Este repositório contém **apenas a tela de autenticação**. É um front-end independente, que futuramente pode ser integrado ao restante da plataforma Sulflux.

## Tecnologias utilizadas

- **React** — biblioteca para construir a interface em componentes reutilizáveis
- **TypeScript** — JavaScript com tipagem, ajuda a evitar erros antes mesmo de rodar o código
- **Vite** — ferramenta que roda o projeto localmente durante o desenvolvimento e empacota os arquivos finais
- **Tailwind CSS** — biblioteca de estilos, usada para toda a aparência visual (cores, espaçamento, cantos arredondados)
- **lucide-react** — biblioteca de ícones

## Pré-requisitos

Antes de rodar este projeto, é necessário ter instalado:

- **Node.js** (versão 18 ou mais recente) — inclui automaticamente o **npm**
- **Git** — para clonar o repositório
- Um editor de código, recomendado o **VS Code**

Para verificar se já tem o Node.js instalado, rode no terminal:

```bash
node --version
npm --version
```

Se aparecer um número de versão para os dois comandos, está tudo certo. Caso contrário, baixe em [nodejs.org](https://nodejs.org) (versão LTS recomendada).

## Como rodar o projeto pela primeira vez

**1. Clonar o repositório**

```bash
git clone https://github.com/juliabechaire/TELA-LOGIN---RS-TALENTOS.git
cd TELA-LOGIN---RS-TALENTOS
```

**2. Instalar as dependências**

```bash
npm install
```

**3. Rodar o servidor de desenvolvimento**

```bash
npm run dev
```

O terminal vai mostrar algo parecido com:

```
VITE ready in 400 ms
➜  Local:   http://localhost:5173/
```

**4. Abrir no navegador**

Acesse o endereço mostrado no terminal (geralmente `http://localhost:5173/`). A tela de login deve carregar com fundo claro e destaque em verde.

## Comandos úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor local de desenvolvimento, com atualização automática ao salvar arquivos |
| `npm run build` | Gera a versão final otimizada do projeto, pronta para publicação (pasta `dist/`) |
| `npm run preview` | Permite visualizar localmente a versão gerada pelo `build`, como ficaria em produção |

## Estrutura do projeto

```
src/
├── components/
│   └── AuthScreen.tsx   → Componente único com os 3 modos: login, cadastro e recuperação de senha
├── App.tsx              → Componente raiz da aplicação
├── main.tsx             → Ponto de entrada, conecta o React ao HTML
└── index.css            → Estilos globais (importa o Tailwind CSS)
```

## Funcionalidades da tela

- **Login**: e-mail, senha (com opção de mostrar/ocultar), checkbox "Lembrar de mim", link para recuperação de senha
- **Cadastro**: nome, e-mail, senha e confirmação de senha (com validação visual caso as senhas não coincidam)
- **Recuperação de senha**: campo de e-mail para envio de link de redefinição

Os três modos convivem numa única página, alternando por meio de botões/links, sem recarregar a tela.

## Estado atual do projeto

Esta tela está, por enquanto, **sem conexão com um backend real** — os botões de "Entrar", "Criar conta" e "Enviar link de recuperação" ainda não enviam dados para nenhum servidor. A validação existente (ex: confirmação de senha) é feita apenas no lado do cliente (navegador). A integração com autenticação real (backend, banco de dados de usuários, tokens de sessão) é um passo futuro do projeto.