const path = require('path');

module.exports = {
    // configurando o webpack
    mode: 'development',
    entry: './frontend/main.js',
    output: {
        // acessa diretorio geral até a pasta js
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            // exclui a pasta node_modules
            exclude: /node_modules/,
            // testa arquivos js
            test: /\.js/,
            use:{
                loader: 'babel-loader',
                options: {
                    presets:['@babel/env']
                }
            }
        }]

    },
    devtool: 'source-map'
};