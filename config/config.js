configuration = {
    development: {
        PORT: 5000,
        connectionString: "mongodb+srv://admin:admin@psychologyoflife.cwidl.mongodb.net/psychologyOfLife?retryWrites=true&w=majority" 
    },
    production: {
        PORT: 80,
        connectionString: "mongodb+srv://admin:admin@psychologyoflife.cwidl.mongodb.net/psychologyOfLife?retryWrites=true&w=majority" 
    }
}

module.exports = configuration[process.env.NODE_ENV.trim()];