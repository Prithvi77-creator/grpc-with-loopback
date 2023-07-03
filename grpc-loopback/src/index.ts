import { ApplicationConfig, GrpcLoopbackApplication } from './application';
import express from 'express';
import { SERVER } from './server';

export * from './application';
export * from './server';

export async function main(options: ApplicationConfig = {}) {
  const app = new GrpcLoopbackApplication(options);
  const grpcServer = new SERVER();

  await app.boot();
  await app.start();

  // Create a separate Express server
  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));

  const url = app.restServer.url;
  console.log(`Try ${url}/ping`);

  // Start the gRPC server
  grpcServer.startServer();

  // Start the Express server
  const port = process.env.PORT ?? 4000;
  expressApp.listen(port, () => {
    
    console.log(`Express server is running on port ${port}`);
  });

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch((err) => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
