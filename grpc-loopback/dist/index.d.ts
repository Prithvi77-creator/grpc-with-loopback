import { ApplicationConfig, GrpcLoopbackApplication } from './application';
export * from './application';
export * from './server';
export declare function main(options?: ApplicationConfig): Promise<GrpcLoopbackApplication>;
