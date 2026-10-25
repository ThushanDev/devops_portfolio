const { app } = require('./app');

const port = Number.parseInt(process.env.PORT || '3000', 10);
const server = app.listen(port, '0.0.0.0', () => console.log(`Portfolio server listening on ${port}`));

function shutdown(signal) {
  console.log(`${signal} received; closing HTTP server`);
  const forceClose = setTimeout(() => process.exit(1), 10000);
  forceClose.unref();
  server.close((error) => {
    clearTimeout(forceClose);
    if (error) {
      console.error('Server shutdown failed:', error.message);
      process.exitCode = 1;
    }
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
