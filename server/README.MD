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

## FRONT-END

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
- *Página em si*
    - Instalar icones: `npm i lucide-react` ou `npm i phosphor-icons`[https://lucide.dev/?search=user]
        - ```javascript
            import { User } from 'lucide-react';
          ```
**Mobile**

- *Instalar fontes no React Native*
    - Expo Google Fonts --> `npx expo install @expo-google-fonts/roboto @expo-google-fonts/bai-jamjuree expo-font`
        ```javascript
            import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'            
            const [hasLoadedFonts] = useFonts({
                Roboto_400Regular,
                Roboto_700Bold,
                BaiJamjuree_700bold
            });
        ```
    - Adicionar no tailwindconfig a propriedade fontFamily e passar `title: 'Roboto_700Bold'`
- *Tela inicial*
    - O CSS do React Native é convertido no Yoga que é uma biblioteca construída para ele. Porém ela não suporta todas as propriedades do CSS, então vamos ter que utilizar uma imagem como blur
    - Para utilizar o blur é necessário importar o <ImageBackground></ImageBackground>, que funciona como a criação de uma div com uma <img> dentro 
        - É necessário definir que todas as imagens do tipo png podem ser importadas
        ```typescript
            declare module "*.png"
        ```
    - Para usar svg precisamos importar a biblioteca [https://github.com/kristerkari/react-native-svg-transformer]: 
        - `npx expo install react-native-svg`
        - `npx install -D react-native-svg-transformer`
        - Criar o arquivo `metro.config.js`
        - Declarar o tipo svg pois estamos usando typescript
    - Como o Native Wind só aceita aplicação de propriedades css pela classe em Componentes, é necessário tornar o SVG estilizável, através do ``styled``

## BACK-END

*Modelagem do Banco*
- User
  * id        String @id @default(uuid())
  * githubId  Int    @unique
  * name      String
  * login     String
  * avatarUrl String
- Memory
  * id        String   @id @default(uuid())
  * coverUrl  String
  * content   String
  * isPublic  Boolean  @default(false)
  * createdAt DateTime @default(now())

- User (1, 1) <-- POSSUI --> (0, N) Memory
- `npx prisma migrate reset`
- `npx prisma migrate dev`

*CRUD DAS MEMORIAS*
- Criar uma route para separar as rotas
- Criar uma camada de service, aonde fica o serviço do prisma, com a opção de passar os logs para o terminal
    ```js
        export const prisma = new PrismaClient({
            log: ['query']
        });
    ```
- Registrar as rotas da aplicação no arquivo `server.ts`
- Para validar os parâmetros da requisição vamos utilizar a biblioteca do ZOD `npm i zod`, e evitar o erro do Typescript, pois ele não sabe como vai ser o objeto da requisição
*Instalação do Cors*
- `npm i @fastify/cors`
- Todas URLS vão utilizar a sua API
    ```js
    app.register(cors, {
        origin: true
    })

    //ou origin: ['https://url1', 'https://url2']
    ```
# AULA 03

## Front-end Web

**Fluxo de authenticação**

- O Github é quem vai fornecer as informações necessárias para a authenticação
- Na nossa authenticação vamos utilizar o protocolo `OAuth`. Ele nos permite fazer o login dentro de uma aplicação usando uma conta existente em outra aplicação (Google, Facebook, Twitter ou Github).
- Fluxo:
    - Usuário Clica no link `fazer login` --> Após ele clicar, redireciona o usuário para pagina de login do github --> Usuario vai logar --> Github verifica se o usuário é valido e vai devolver o usuário (junto com um `?code=asdasdsad`) para o front-end --> Com esse código, nós vamos enviar ele para o back-end e buscar os dados do usuário com o código no github     para poder cadastrar ele no banco de dados
- É necessário ir até Setting no Github -> Developer Settings -> OAuthApp --> Nome, HomePageURL (URL da APlicação), Authorization callback URL (http://localhost:3000/api/auth/callback)
    - Após criar ele vai devolver o `client ID`, que é algo muito importante para o login e vamos salvar como variavel de ambiente da aplicação front-end
    - Generate a new client secrete --> Salvar como variavel de ambiente da aplicação back-end
- No Next, as variaveis de ambiente que vão ser expostas aos componentes, é obrigatório colocar na variavel `NEXT_PUBLIC_`
*Obtendo Github code web*
- Colocar no href do front-end {`https://github.com/login/oauth/authorize?client_id${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID`} 
- Agora quando a gente logar ele vai reenviar a gente para a página que chamou ele, 
com o parâmetro `http://localhost:3000/api/auth/callback?code=5123412421412`
*Separando o front-end em Componentes*

## Back-end
*Auth route*
- `npm i dotenv -D`
    - `import 'dotenv/config'`
- `npm i axios`
    - ```js
            const accessTokenResponse = await axios.post(
                "https://github.com/login/oauth/access_token",
                null,
                {
                    params: {
                        teste: '',
                    },
                    headers: {
                        Accept: 'Application/json',
                    }
                })

            const userResponse = await axios.get("https://api.github.com/user", {
                headers: {
                    Authorization: `bearer ${access_token}`,
                }
            })
            //Os headers são os metadados da requisição, o Accept especifica qual o tipo de retorno que nós queremos
            //Os params do axios são as querys da URL
      ```
- Agora podemos pegar o código que a gente pega no Front-end quando loga com o Github e enviar para essa rota `register` e ter o `access_token`, que vai permitir o acesso as informações do usuário

## Front-end Web

## Mobile

## Back-end