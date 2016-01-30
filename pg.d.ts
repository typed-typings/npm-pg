import { EventEmitter } from "events"
import { Writable, Readable } from "stream"

declare module pg {

  interface QueryCallback {
    (err: Error, result: ResultSet): void;
  }

  interface ClientConnectCallback {
    (err: Error, client: Client): void;
  }

  interface ConnectCallback {
    (err: Error, client: Client, done: Done): void;
  }

  interface Done {
    (): void;
  }

  interface ResultSet {
    rows: any[];
  }

  interface QueryConfig {
    name?: string;
    text: string;
    values?: any[];
  }

  interface Config {
    host?: string;
    user?: string;
    database?: string;
    password?: string;
    port?: number;
    poolSize?: number;
    rows?: number;
    binary?: boolean;
    poolIdleTimeout?: number;
    reapIntervalMillis?: number;
    poolLog?: boolean;
    client_encoding?: string;
    ssl?: boolean;
    application_name?: string;
    fallback_application_name?: string;
  }

  interface ResultBuilder {
    command: string;
    rowCount: number;
    oid: number;
    rows: any[];
    addRow(row: any): void;
  }

  export interface PoolSet {
    all: { [key: string]: Pool },
    getOrCreate(config: Config): Pool,
    getOrCreate(connString: string): Pool
  }

  //extends npm generic-pool
  export interface Pool {
    name: string,
    max: number,
    idleTimeoutMillis: number,
    reapIntervalMillis: number,
    log: boolean,
    create(cb: ClientConnectCallback): void,
    destroy(client: Client): void
  }

  export class Query extends EventEmitter {
    text: string;
    values: any[];

    on(event: "row", listener: (row: any, result: ResultBuilder) => void): EventEmitter;
    on(event: "end", listener: (result: ResultBuilder) => void): EventEmitter;
    on(event: "error", listener: (err: Error) => void): EventEmitter;
    on(event: string, listener: Function): EventEmitter;
  }

  export class Client extends EventEmitter {
    constructor(connString: string);
    constructor(config: Config);

    user: string;
    database: string;
    port: string;
    host: string;
    password: string;
    binary: boolean;
    encoding: string;
    ssl: boolean;

    query(query: QueryConfig, callback?: QueryCallback): Query;
    query(text: string, callback: QueryCallback): Query;
    query(text: string, values: any[], callback: QueryCallback): Query;

    connect(callback: ClientConnectCallback);
    end();

    pauseDrain(): void;
    resumeDrain(): void;

    on(event: "drain", listener: () => void): EventEmitter;
    on(event: "error", listener: (err: Error) => void): EventEmitter;
    on(event: "notification", listener: (message: any) => void): EventEmitter;
    on(event: "notice", listener: (message: any) => void): EventEmitter;
    on(event: string, listener: Function): EventEmitter;
  }

  export var defaults: Config;
  export var pools: Pools;
  export function connect(connString: string, callback: ConnectCallback): void;
  export function end(): void;
  export function cancel(config: Config, client: Client, query: Query)
}

export = pg;
