const express = require("express");
const {store} = require("./temp/store");
const {flowers} = require("./temp/flowers");
const cors = require('cors');

const application = express();
const port = process.env.PORT || 4002;

application.use(express.json());
application.use(cors());

application.get('/', (request, response) => {
  response.status(200).json({done: true, message: 'Fine!'});
});

application.get('/register', (request,response) =>{
  let name = request.body.name;
  let email = request.body.email;
  let password = request.body.password;
  store.addCustomer(name,email,password);
  response.status(200).json({done: true, message: "Customer added"})
});

application.post('/login', (request,response) => {
  let password = request.body.password;
  let email = request.body.email;
  let result = store.login(email,password);
  if(result.valid){
    response.status(200).json({done: true, message: "Customer logged in"})
  } else {
    response.status(401).json({done: false, message: result.message})
  }
});

application.get('/quiz/:id', (request, response) => {
  let id = request.params.id;
  let result = store.getQuiz(id);
  if(result.done){
    response.status(200).json({done: true, result: result.quiz})
  } else {
    response.status(404).json({done: false, message: result.message})
  }
});

application.get('/flowers', (request, response) => {
  response.status(200).json({done: true, result: flowers, message: "Done"})
})


application.all('*', (request, response) => response.redirect('/'))

application.listen(port, () => {
  console.log('Listening to the port');
})
