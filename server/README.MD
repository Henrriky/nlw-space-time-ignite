# AULA 01

## Back-end
*Typescript*
- `npm i typescript -D`
- `npm i @types/node -D`
- `npx tsc --init` --> Inicinpa o arquivo de configuração do TypeScript
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
*JWT*
- Como o access_token expira rápido, não é possível utilizar ele para manter a sessão do nosso usuário
35:12
- `npm i @fastify/jwt`
- No JWT nós utilizamos uma palavra secreta para que ocorra a segurança do nosso token. Ou seja, quem não tiver a palavra secreta usada no back-end não vai conseguir gerar um token válido.
- Senhas não vao no JWT, pois qualquer um pode decodificar o token. Portanto, ele só é útil para evitar o acesso indevido a uma rota, pois mesmo que o hacker saiba as informações do usuário, caso ele não saiba a chave secreta ele não conseguirá ter um token válido.
    ```js
    const token = app.jwt.sign({
        name: user.name,
        avatarUrl: user.avatarUrl
    }, {
        sub: user.id,
        expiresIn:'30 days',
    })
    
    ```
- Agora esse token é enviado para o front-end toda vez que ele é logado. Assim ele poderá utilizar o mesmo token para requisições futuras no back-end.
*Rotas autenticadas*
- Quando instalamos o @fastify/jwt temos acesso a algumas funções novas do request, como: `request.jwtVerify()`, que verifica se está sendo enviado um token.
- Quando usar o JWT precisamos criar um tipo para o nosso retorno do JWT `auth.d.ts`
- Como se tornaria repetitivo aplicar a função request.jwtVerify colocamos o seguinte código no corpo da função do memoriesRoutes 
    ```js
    app.addHook('preHandler', async (request) => {
        await request.jwtVerify();
    }) 
    //Antes de executar os middleware de cada rota, execute isso
    ```

## Front-end Web

*Lidando com a resposta do github e aplicando cookies*
- Precisamos lidar com o código que o Github devolve com a URL interpolada. No Next, ele permite que a gente criar rotas como se fossem um back-end, para lidar com informações como essa.
    - Devemos criar a seguinte estrutura de pastas `src/app/auth/callback/route.ts`
    - Nesse arquivo vamos criar uma função async do tipo `GET`, pois a URL devolvida pelo github vem através do método GET
    - Para acessar as querys da URL 
    ```js
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    ```
    - `npm i axios` --> Para poder acessar o back-end
    - Back-end devolve o JWT
    - Nós vamos guardar esse JWT nos Cookies
        ```js
        return NextResponse.redirect(redirectURL, {
            headers: {
                'Set-Cookie': `token=${token}; Path=/;` //Path=/ significa que o cookie token poderá ser acessado por toda a aplicação
            }
        });
        ```
    - Entretanto, mesmo que ele esteja enviando os cookies, ele está expirando de acordo com a sessão, então se o navegador fechar o cookie vai sumir. Para resolver isso precisamos passar um parâmetro chamado `maxage`
        ```js
        return NextResponse.redirect(redirectURL, {
            headers: {
                'Set-Cookie': `token=${token}; Path=/; max-age=2592000;` //Explicito em segundos
            }
        });
        ```
*Gerando dados do usuario na tela através dos cookies*

- Verifica se o usuario está logado 
    ```js
        const isAuthenticated = cookies().has("token");
    ```
- Para conseguirmos realizar o decode do JWT usamos o `npm i jwt-decode`
- Agora vamos criar um arquivo dentro da pasta lib chamado `auth.ts` que vai realizar o decode do token e retornar um User para ser usado no componente profile

## Mobile

*Fluxo authenticação mobile*
- Vamos usar o pacote (Expo AuthSession)[https://docs.expo.dev/versions/latest/sdk/auth-session/] do EXPO para abrir o navegador quando o usuario clicar em cadastrar memória.
    - `npx expo install expo-auth-session expo-crypto`
    - Adicionar um scheme no `app.json`
- Vamos ter que criar outro registro no github para o mobile
    - É necessário colocar no `Authorization callback URL` `exp://192.168.1.118:19000`
    - Agora devemos seguir a documentação do OAuth  no expo e implementar o OAuth 
*Chamar back-end*
- `npm i axios`
- Além disso precisamos alterar no app.listen o host para '0.0.0.0'. Outro ponto é que como criamos outro serviço do OAuth no github, é enecessário gerar adicionar os novos client_id e secret nas variaveis de ambiente
*Salvar o token no android*
- Como no android não tem cookies vamos usar o pacote (Expo SecureStore)
    - `npx expo i expo-secure-store`
    - `SecureStore.setItemAsync("token", token)`
*Trocando de rotas*
- Vamos utilizar o (Expo Router)[https://expo.github.io/router/docs/] para simular a mesma forma que fazemos no Next.js para acessar varias rotas`
    - `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler`
    - Criar a pasta APP que será todas as páginas da aplicação
    - Importar o  useRouter
        - `import { useRouter } from 'expo-router'`

## Back-end

# AULA 04

## FRONT

*Layout no next*
- No Next, o Layout é aquilo que não muda na página, por isso temos o arquivo `page` e o arquivo `layout`. Por isso vamos colocar no arquivo layout tudo aquilo que não vai mudar na nossa aplicação. 
    - A propriedade `{children}` do layout.tsx recebe o componente que é renderizado de acordo com a url que o usuario está. Por exemplo, se ele estiver na página inicial, ele vai renderizar o page.tsx no lugar do children.

*Logout*
- Criar uma nova rota get que limpa os cookies e redireciona para a página principal.

*New memory*
- Criar uma nova rota de new memory na aplicação
- Input checkbox
    - `npm i -D @tailwindcss/forms`
    - `tailwind.config.js` `plugings: [ require('@tailwindcss/forms')]`

*Middleware no front*
- O usuário consegue acessar rotas que ele não deveria pela URL se ele não estiver logado. Para evitar esse comportamento, nós usamos algo que é chamado de middleware, que nada mais é do que uma funcionalidade para quando nós queremos barrar com alguma regra o acesso à algum recurso que depende da regra.
    - No Next nós criamos um arquivo chamado `middleware.ts` na pasta src
    - Esse arquivo vai ter uma `função` e um objeto que é exportado chamado de `config`, que contém a propriedade `matcher`, que recebe quais são as rotas que você deseja que seja acionado o middleware.
        - Exemplo: `matcher: "/memories/:path*",` Qualquer rota que venha depois de memories
    - Agora podemos redirecionar o usuario se ele não estiver logado e tentar acessar a rota `memories/new`. Mesmo através das rotas ou através do botão cadastrar lembranças do componente `page`.

## MOBILE

- No React Native nós podemos utilizar um layout, que funciona igual ao Next, ou seja, ele utilza um design para todas as outras telas.
    - Para isso, criamos um componente chamado `_layout.tsx`, programando o que você quer que apareça na tela em todas as outras.
- Para aparecer a página index.tsx, nós podemos utilizar o `<Slot/>` do `Expo Router`
    - Porém, se utilizarmos o Slot ele vai realizar uma animação de navegação muito seca, prejudicando a usabilidade do usuario.
*Stack*
- A Navegação do tipo `Stack` é mais interessante e funciona como se fosse uma **pilha**, fazendo uma animação quando ocorre a troca de páginas.
    - Características:
        - Cria um cabeçalho com o nome da página automaticamente, nesse caso seria o `index.tsx`, que o React native reconhece como a página inicial.
        - Para esconder esse `cabeçalho`, nós podemos utilizar a propriedade `screenOptions={{ headerShown: false }}`
        - O fundo branco também é outra coisa que vem automaticamente com o stack, para retirar ele usamos a propriedade `contentStyle={{ backgroundColor: transparent }}`
        - Podemos criar um Stack.Screen, que é um componente que recebe outros componentes que serão as rotas da aplicação. Além disso, com a propriedade redirect nós conseguimos redirecionar o usuario automaticamente quando o valor da propriedade for `true`
- 51:37 --> Erro não redireciona para memories.tsx
- Não queremos que o usuário tenha que ficar logando toda vez que entrar na aplicação, então quando o usuário entrar na aplicação, o componente que é chamado em todas as outras telas `layout.tsx` vai ter uma lógica que faz com que ocorra uma verificação em cima da existência do token, redirecionando ou não o usuário para uma tela sem precisar logar novamente.
    - `!!token` - o !! converte para um booleano automaticamente a variavel se o token existir, caso ele não exista ele retorna false.
*Rota new*
- Para criar a rota new nós usamos o Stack, que vai redirecionar para a página new automaticamente se existir um token.
- Para pegar o `tamanho da status bar automaticamente` nós usamos uma função chamada de `useSafeAreaInsets()`
- 1:10:00
*Scroll*
- Para usar o scroll precisamos transformar o component `View` em uma `ScrollView`
    - Na `ScrollView` os estilo são passados pela propriedade `contentContainerStyle`

## BACK-END

*Upload de imagens*
- `npm i @fastify/multipart` --> Permite o envio de informações como upload de imagens
    - Recebemos esse arquivo pelo multipart form 
        ```js 
            //Request recebe o registro do multipart do fastify
            const upload = await request.file({ //Pegando o arquivo quando a rota é acessada
                limits: {
                    fileSize: 5_242_880, // 5mb
                }
            });

            if (!upload) { //Verificando se existe um arquivo
                return reply.status(400).send();       
            }

            upload.mimetype
        ```
    - Vamos criar um uuid e concatenar ele com a extensão do arquivo para poder salva-la de forma única
    - No node nós temos também a funcionalidade de streaming (carregamento do arquivo aos poucos).
    - OBS: dirname --> Mostra qual o diretório que o arquivo especificado está
    - Após utilizar o `streaming` junto com o `multipart` do fasitify nós conseguimos salvar nossa foto quando a requisição é chamada.
    - 1:31:28 --> Adicionar capa para a memória/url
        - ```js 
            const fullUrl = request.protocol.concat('://').concat(request.hostname);
            const fileUrl = new URL(`/uploads/${fileNameGenerateByIdAndExtension}`, fullUrl).toString();
          ```
    **Observação: Quando nós criamos uma aplicação que vai salvar uma imagem é mais interessante utilizar serviços prontos, como: Amazon S3, Google GCS, CloudFare R2**
    - Agora temos a URL da nossa imagem, entretanto, a nossa aplicação não expõe as pastas do computador, por isso precisamos fazer algo para resolver
    isso: 
    - Fazer a pasta do back-end ficar pública `npm i @fastify/static`
    - Agora a nossa aplicação está com a pasta uploads pública: 
        - ```js
            app.register(require('@fastify/static'), {
                root: resolve(__dirname, '../uploads'),
                prefix: '/uploads/',
            })
        ```

# AULA 05

**WEB**
- [X] Preview da Mídia
    - Quando usamos Javascript do lado do client, como por exemplo na reatividade do React nós precisamos usar a diretiva `useClient`
        - Nas versões mais atualizadas do React, se o javascript utilizado for mínimo nós criamos um componente separado, para não precisar gerar um javascript desnecessário do lado do cliente.
    - Agora que separamos o MediaPicker precisamos criar um estado para preview e uma função que pega esse valor e atualiza o estado:
        ```js
              const [preview, setPreview] = useState<string | null>(null);
              function onFileSelected (event: ChangeEvent<HTMLInputElement>) {
                console.log(event.target.files);
              }
        ```
    - Existe uma forma de fazer um `if` ternário sem o `:` que seria o else --> `variavelBooleana && "sim"`
    - Na função `onFileSelected` vamos criar uma URL para o arquivo através do `URL` do node
- [X] Criando nova memória e enviando para o Back-end
    - No React nós trabalhamos com o envio de formulário através de função que guardam estado, logo teremos que criar um componente para esse formulário, e criar uma função que vai ser chamada quando o formulario for enviado.
    - Nessa função vamos ter: 
        - Uma lógica que `envia a imagem` e `recebe o fileUrl`
        - Esse `fileUrl`, vai ser enviado junto com as outras informações para a requisição de criar uma nova memória.
    - Para acessar os `cookies` em um componente com `useClient` é preciso usar a variavel `document.cookie`.
        - Como o retorno dessa variavel é uma string estranha podemos utilizar a biblioteca `js-cookie` para extrair o token
    - Por fim, vamos redirecionar o usuario para a página inicial utilizando o `useRoute() e o route.push("/")`.
**MOBILE**
- [X] Selecionando imagem da galeria
    - Como no React Native nós não possuimos um `form`, nós precisamos anotar cada campo do "formulario" em um estado
    - Para selecionar uma imagem da galeria vamos utilizar a biblioteca `expo image picker` --> `npx expo install expo-image-picker`
- [X] Preview da imagem
    - Para fazer um preview da imagem precisamos salvar a URI da imagem selecionada em um estado, e utilizar o componente `Image` do React Native para poder
    passar para a propriedade `source` o caminho da imagem que está salvo no estado `preview`
- [X] Criando memórias na API
    - Novamente, vamos precisar criar um `FormData`, pois o back-end recebe um form multipart, para isso precisamos definir um file e simular um arquivo, pois no React Native não temos o arquivo em si igual na web
    - Devemos também passar para o axios os headers, especificando o `Content-type: multipart/form-data`
- [X] Botão de logout
- [X] Layout da listagem
- [X] Buscando memórias na API
    - Para usar assincronismo no useEffect nós devemos criar uma função async fora do escopo do useEffect e chamar ela dentro dele.
    - Criar um estado para as memórias da chamada 
    - Para manipular a data podemos utilizar a biblioteca `npm i dayjs`
    - Vamos utilizar aqui o isFocused para que seja possível a atualização do componente toda vez que a tela receber o foco.
**WEB**
- [X] Layout da listagem
- [X] Buscando memórias na API
    - No NEXT, nós conseguimos em componentes que não usem o 'use client' usar async nas funções e fazer uma chamada HTTP sem useEffect ou estado.
    - Instalar o Dayjs no ambiente WEB
    - Usar a tag `Image` do NEXT e configurar no `NExt.config.js` o domínio do nosso servidor

# DESAFIOS
- [] Edição da memória
- [] Link para compartilhar memória
- [] Selecionar data da memória (Date picker)
- [] Layout responsivo
- [] Comentar na memória
- [] Obter uma memória específica
- [] Procurar pessoas