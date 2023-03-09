// variáveis e requerimentos
require('dotenv').config(); // variáveis de ambiente
const express = require('express'); // inicio do express
const app = express();
const mongoose = require('mongoose'); // modela a base de dados
const session = require('express-session'); // identifica navegador de cliente (cookie)
const MongoStore = require('connect-mongo'); // indica que as sessões serão salvas na base de dados
const flash = require('connect-flash'); // mensagens autodestrutivas
const routes = require('./routes'); // rotas da sessão (pagina inicial, pagina de contato)
const path = require('path'); // trabalha com os caminhos
const helmet = require('helmet'); // garante a segurança da aplicação
const csrf = require('csurf'); // proteção para formulários
const { middleWareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middlewares'); // funções executadas na rota


mongoose.connect(process.env.CONECTIONSTRING, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    })
    .then(() => {
        app.emit('pronto');
    }).catch(e => console.log(e)); // retorna uma promisse


                        //rota   params    queryStrings
                                        // chave:valor
// http://facebook.com/profiles/12345?campanha=googleads

// profiles = rota
// 12345 = parametros
// campanha=googleads = chave/valor


app.use(helmet());
// *****PEGANDO VALORES DO POST*****
app.use(express.urlencoded({
    extended: true
})); // permite postagem de formulários na aplicação

// conteudo estático
app.use(express.static(path.resolve(__dirname, 'public'))); // são todos os arquivos estáticos da sessão e podem ser acessados diretamente

// configurações de sessão*************************************************
const sessionOptions = session({
    secret: 'ccpvrtebcwgfe',
    store: MongoStore.create({ mongoUrl: process.env.CONECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());
// ************************************************************************

app.set('views', path.resolve(__dirname, 'src', 'views')); // arquivos de renderização
                                                          // caminho para arquivos html
                                                          // informando caminho absoluto

app.set('view engine', 'ejs') // escolhe engine de view

app.use(csrf());
                                                          
// pegando middlewares
app.use(middleWareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);


app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () =>{
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
}); // inicio de evento após a conexão com a base de dados