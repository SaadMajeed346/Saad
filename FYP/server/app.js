const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose=require('mongoose')
const cors = require('cors');
const node = require('./node')
const app = express();
global.vr="yes";
// allow cross-origin requests
app.use(cors());

// bind express with graphql
mongoose.connect('mongodb+srv://saadmajeed346:saad321@cluster0.48feh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open',()=>{
    console.log('Connected to database');
})
app.use('/server', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});