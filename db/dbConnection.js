const username = 'carolinaviasus'
const pass = 'Culturarasta2'
const dataBase = 'BdProject1'
const stringConnection = `mongodb+srv://${username}:${pass}@clusterg42.fz7ssm1.mongodb.net/${dataBase}?retryWrites=true&w=majority`
                    
module.exports =  stringConnection;
// module.exports =  stringConn  ; //exportacion por defecto