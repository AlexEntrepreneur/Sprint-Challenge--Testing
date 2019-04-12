const server = require('./server');
const PORT = 4321 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
