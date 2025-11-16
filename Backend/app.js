const express = require('express');
const cors = require('cors');
const location = require('./routes/locationRoute');
const empresa = require('./routes/empresaRoute');
const colaborador = require('./routes/colaboradorRoute');


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api/v1/location", location);
app.use("/api/v1/empresa", empresa);
app.use("/api/v1/colaborador", colaborador);

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});