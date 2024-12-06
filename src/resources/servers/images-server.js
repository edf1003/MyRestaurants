/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, '..', '..', '..', 'public', 'assets', 'images')
    );
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ninguna imagen');
  }
  res.send({
    message: 'Imagen subida con éxito',
    filename: req.file.filename,
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.delete('/images/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'public',
    'assets',
    'images',
    filename
  );

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al eliminar la imagen');
    }
    res.send('Imagen eliminada con éxito');
  });
});
