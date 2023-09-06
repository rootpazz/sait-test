const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Определите путь к файлу index.html
  const filePath = path.join(__dirname, 'index.html');

  // Прочтите файл index.html и отправьте его как ответ
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Если произошла ошибка при чтении файла, отправьте статус 500 (внутренняя ошибка сервера)
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      // Определите MIME-тип на основе расширения файла
      const extname = path.extname(filePath);
      let contentType = 'text/html';

      switch (extname) {
        case '.js':
          contentType = 'text/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        // Добавьте другие типы файлов по мере необходимости

      }

      // Установите заголовок Content-Type на основе MIME-типа
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});