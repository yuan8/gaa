var express         = require('express');
var app             = express();
var graphqlHTTP     = require('express-graphql');
var { buildSchema } = require('graphql');
var mysql           = require('mysql');

// dbconnect
var connection      = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gaa'
});

connection.connect();

// check connecttion db
connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
});





// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    k:String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  k: () => {
    var queryString = 'SELECT * FROM users';
    var da='yu';
    
    connection.query(queryString, function(err, rows, fields) {
      if (err) throw err;
 
      // var da=[];

      for (var i in rows) {

          da.push(rows[i]);
        
      }

      console.log(type(da));



    });
    
  console.log(da);
    return da;
  },
};


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(808);
console.log('Running a GraphQL API server at localhost:808');