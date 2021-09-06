const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {
	const url = req.url === '/' ? 'index.html' : req.url;
	const filePath = `${__dirname}/${url}`;
	const extname = path.extname(filePath);
	let contentType = 'text/html';

	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break
		case '.css':
			contentType = 'text/css';
			break
		case '.png':
			contentType = 'image/png';
			break
		case '.jpg':
			contentType = 'image/jpg';
			break
	};

	fs.readFile(filePath, 'utf-8', (err, data) => {
		if (err) throw err;

		res.writeHead(200, { 'Content-Type': contentType });
		res.end(data);
	});
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`App running on port ${port}`));