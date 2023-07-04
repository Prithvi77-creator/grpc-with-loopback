import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class TestDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        spec: string;
        validate: boolean;
        host: string;
        port: number;
        remotingEnabled: boolean;
    };
    constructor(dsConfig?: object);
}
