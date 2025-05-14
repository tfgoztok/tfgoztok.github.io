# Node.js Questions and Answers

## Question 1: Event Loop and Module Outputs

### Question
What will be outputs in ES module and CommonJS module?

```javascript
import fs from "fs";

process.nextTick(() => console.log('nextTick 1'));

Promise.resolve().then(() => console.log('promise 1'));

setImmediate(() => { console.log('setImmediate 1') });

setTimeout(() => console.log('setTimeout 1'), 0);

fs.readFile('./files/input.txt', "utf-8", (err, data) => {
    if (err)
        console.log('there is an error. can not read from file');
    else {
        console.log(data);
    }
});
```

### Answer
The output will be the same in both ES modules and CommonJS modules because the event loop behavior is consistent across both module systems. The order of execution will be:

1. `nextTick 1` (process.nextTick has the highest priority)
2. `promise 1` (Promise callbacks are executed in the microtask queue)
3. `setTimeout 1` (setTimeout with 0ms delay)
4. `setImmediate 1` (setImmediate callbacks)
5. File content or error message (fs.readFile callback)

The order is determined by Node.js event loop phases:
- process.nextTick queue (highest priority)
- Promise callbacks (microtask queue)
- Timers (setTimeout, setInterval)
- I/O callbacks (fs.readFile)
- setImmediate callbacks

## Question 2: HTTP Server Implementation

### Question
Create a web server using http module with the following requirements:
- Path '/image' (GET): Send an image response with appropriate content-type
- Path '/pdf' (GET): Send a PDF file with content-type "application/pdf"
- Path '/about' (GET): Send a text file with content-type "text/plain"
- Path '/home' or '/' (GET): Send "Welcome to my website" text
- Other paths: Return 404 Not Found

### Answer
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    switch (url) {
        case '/':
        case '/home':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to my website');
            break;

        case '/image':
            const imagePath = path.join(__dirname, 'assets', 'image.jpg');
            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Image not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            });
            break;

        case '/pdf':
            const pdfPath = path.join(__dirname, 'assets', 'document.pdf');
            fs.readFile(pdfPath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('PDF not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/pdf' });
                res.end(data);
            });
            break;

        case '/about':
            const textPath = path.join(__dirname, 'assets', 'about.txt');
            fs.readFile(textPath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('Text file not found');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            });
            break;

        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
```

## Question 3: File Reading Methods Comparison

### Answer

1. **fs.readFileSync()**
```javascript
const fs = require('fs');

try {
    const data = fs.readFileSync('file.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}
```
- Synchronous operation
- Blocks the event loop until file is read
- Returns the file contents directly
- Use for small files or when synchronous operation is required
- Not recommended for large files or production applications

2. **fs.readFile()**
```javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
```
- Asynchronous operation
- Uses callback pattern
- Doesn't block the event loop
- Good for small to medium-sized files
- Memory usage depends on file size

3. **fs.promises.readFile()**
```javascript
const fs = require('fs').promises;

async function readFile() {
    try {
        const data = await fs.promises.readFile('file.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```
- Asynchronous operation
- Returns a Promise
- Modern approach with async/await support
- Similar to fs.readFile() but with Promise interface
- Better error handling with try/catch

4. **fs.createReadStream()**
```javascript
const fs = require('fs');

const readStream = fs.createReadStream('file.txt', 'utf8');

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});

readStream.on('end', () => {
    console.log('Finished reading file');
});

readStream.on('error', (err) => {
    console.error('Error reading file:', err);
});
```
- Streaming approach
- Reads file in chunks
- Memory efficient for large files
- Event-based API
- Best for large files or real-time processing
- Can handle files larger than available memory

### Differences between all of them are:
1. **Memory Usage**:
   - readFileSync/readFile/readFile.promises: Loads entire file into memory
   - createReadStream: Processes file in chunks, memory efficient

2. **Performance**:
   - readFileSync: Blocks event loop, poorest performance
   - readFile/readFile.promises: Non-blocking, good for small files
   - createReadStream: Best for large files, memory efficient

3. **API Style**:
   - readFileSync: Synchronous
   - readFile: Callback-based
   - readFile.promises: Promise-based
   - createReadStream: Event-based

4. **Use Cases**:
   - Small files: Any method works
   - Large files: Use createReadStream
   - Real-time processing: Use createReadStream
   - Simple scripts: readFileSync might be convenient
   - Modern applications: Prefer readFile.promises or createReadStream 