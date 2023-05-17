# AULA 01

## Back-end
*Typescript*
- `npm i typescript -D`
- `npm i @types/node -D`
- `npx tsc --init` --> Inicia o arquivo de configuração do TypeScript
- `npm i tsx -D` --> Serve para automatizar o processo de compilar arquivo js e executar o arquivo js com node
    - `npx tsx src/server.ts` --> Compila e executa o arquivo server.ts
    - Colocar em um comando menor: 
        - ```json
          "scripts": {
                "dev": "tsx watch src/server.ts"
           },
          ```
        - Watch serve para executar o código automaticamente toda vez que ocorrer uma alteração
        - Executar: `npm run(script) dev`

*Fastify*
- Vai ser usado em produção, semelhante o Express
- `npm i fastify`

*Prisma+SQLite*
- Prisma -> ORM (Suporta PostreeSQL, MYSQL, SQLite, SQLServer, MongoDB)
- SQLite -> Banco de dados em Memória
- `npm i prisma -D` --> Permite a instalação da linha de comando do prisma, por isso é de desenvolvimento
    - `npx prisma -h` --> Lista os comandos
    - `npx prisma init --datasource-provider SQLite` -> Iniciar o arquivo do prisma com o provider sendo o SQLite
- Criando o Model/Entity
    ```prisma
        model User {
            id String @id
        }
    ```
- Para implementar o Model: `npx prisma migrate dev`
    - Controle do versão no DB
    - Ele vai pedir o nome da migration, que é as alterações que nós fizemos
- Acessar o banco com o prisma no navegador: `npx prisma studio`
- Acessar o banco através do server.ts: `npm i @prisma/client`
    - ```javascript
        import { PrismaClient } from '@prisma/client'
        app.get("/hello", async () => {
            const users = await prisma.user.findMany();
            return users;  
        })
      ```
## Front-end

*React+next*
- Next.js: `npx create-next-app@latest web --use-npm`
    - `npm run dev` --> Já inicia o app React
    - Autocomplete: 
        - ```json
            "emmet.syntaxProfiles": {
                "javascript": "jsx"
            },
            "emmet.includeLanguages": {
                "javascript": "javascriptreact"
            }
          ```
*Conceitos do Next e React*
    - No Next, dentro da pasta `app`, todo arquivo que estiver com o nome page vai virar automaticamente uma rota da aplicação 
        - Por exemplo, se criarmos uma pasta `ignite` com o arquivo `page.tsx`, quando acessarmos a rota `http://localhost:3000/ignite` ele irá exibir o componente page
        - Uma subpasta `depoimentos` seria acessada assim `http://localhost:3000/ignite/depoimentos`
*Tailwind*

- Arquivo `tailwind.config.js`
- Não se cria arquivos CSS, tem o arquivo `globals.css` que configura algumas coisas. E todo o restante é feito com classes dentro dos componentes

## Mobile

- (Expo Docs)[https://docs.expo.dev]
- `npx create-expo-app my-app`
- Como o expo entende TypeScript automaticamente basta nós trocarmos a extensão do app.js para tsx e roda o projeto
    - Quando executarmos ele vai perguntar se queremos usar o TypeScript, depois disso ele vai configurar todos os arquivos para aceitar typescript: typescript@^4.9.4, @types/react@~18.0.27
*Conceitos React Native*
- No React Native nós não usamos HTML e sim componentes prontos do React Native
- No React Native o CSS é escrito na forma de CSS in JS, que segue a seguinte sintaxe:
    ```javascript
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#000',
                alignItems: 'center',
            },
        })
    ```
    - Para referenciar o estilo, nós colocamos uma propriedade `style` no componente, que recebe `style={styles.container}`, que nada mais é do que o acesso ao objeto de estilo que queremos aplicar
    - Além disso, no React Native também não tem herança de estilos
- No React Native todos os elementos são display flex por padrão   
*Tailwind com ReactNative*
- É possível utilizar o Tailwind no React Native, porém, precisamos instalar um pacote da comunidade chamado de (NativeWind)[https://www.nativewind.dev/quick-starts/expo] 
    - `npm i nativewind`
    - `npm i tailwindcss -D`
    - `npx tailwindcss init`
        - Vai criar o arquivo tasilwindconfig
            ```js
            /** @type {import('tailwindcss').Config} */

                module.exports = {
                    content: ["./App.tsx", "./app/**/*.tsx"],
                    theme: {
                        extend: {},
                    },
                    plugins: [],
                }
            ```
        - Adicionar `plugins: ['nativewind/babel']` no arquivo `babel.config.js`
        - Adicionar o types no arquivo tsconfig.json 
            ```json 
                {
                    "compilerOptions": {
                        "types": [
                        "nativewind/types"
                        ]
                    },
                    "extends": "expo/tsconfig.base"
                }
            ```

# AULA 02

**Front-end**

- *Baixar Fonte do Google*
    - Não é necessário baixar a fonte ou colocar ela no HTML, pois o Next já possui uma forma integrada de adicionar essas fontes, através da pasta `next/font/google`
    - Basta nós importarmos a fonte a partir do arquivo layout.tsx
- *Integrar fonte com o Tailwind.css*
    - No arquivo `layout.tsx`
        - ```javascript
            const roboto = Roboto({ subsets: ['latin'],  variable: '--font-roboto' })
            const baiJamjuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree' })
          ```
        - A propriedade variable será o nome da font na definição do CSS/Tailwind
    - No arquivo `tailwind.config.js`: 
        - ```javascript
            theme: {
                extend: {
                fontFamily: {
                    sans: 'var(--font-roboto)',
                }
                },
            },
          ```

- *Adicionar cores no Tailwind / Paleta de cores geradas automáticamente pelo plugin do Figma `Foundation: Color Generation`*
    - Sobrescrever a propriedade gray da propriedade color no arquivo tailwind.config
    ```js
    
    
    
    colors: {
        gray: {
          50: '#eaeaea'
          100: '#bebebf'
          200: '#9e9ea0'
          300: '#727275'
          400: '#56565a'
          500: '#2c2c31'
          600: '#28282d'
          700: '#1f1f23'
          800: '#18181b'
          900: '#121215'
        }
      }
    ```
    -  No Next quando salvamos dentro da pasta app um arquivo chamado icon.png, ele utiliza ele automaticamente como icone da página
- **