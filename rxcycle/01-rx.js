const Rx = require('rx');
const requests_ = new Rx.Subject();

function sendHello(e) {
  console.log('sending hello');

  e.res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  e.res.end('Hello World\n');
}

const subscription = requests_
  .tap(e => console.log('request to', e.req.url))
  .subscribe(sendHello, console.error, () => {
    console.log('stream is done');
    subscription.dispose();
  });

process.on('exit', () => subscription.dispose());

const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;

const app = http.createServer((req, res) => {
  requests_.onNext({
    req: req,
    res: res
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
