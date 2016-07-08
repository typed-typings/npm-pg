import { EventEmitter } from "events"
import { Writable, Readable } from "stream"
import { TlsOptions } from "tls"
import * as PgPool from "pg-pool"

type ClientConstructor = new (connection: string | Config) => Client;
type QueryCallback = (err: Error, result: ResultSet) => void;
type ClientConnectCallback = (err: Error, client: Client) => void;
type ConnectCallback = (err: Error, client: Client, done: DoneCallback) => void;
type DoneCallback = () => void;

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
  ssl?: boolean | TlsOptions;
  application_name?: string;
  fallback_application_name?: string;
  parseInputDatesAsUTC?: boolean;
}

interface ResultBuilder {
  command: string;
  rowCount: number;
  oid: number;
  rows: any[];
  addRow(row: any): void;
}

export class Pool extends PgPool
{

}

export class Query extends EventEmitter {
  text: string;
  values: any[];

  on(event: "row", listener: (row: any, result: ResultBuilder) => void): this;
  on(event: "end", listener: (result: ResultBuilder) => void): this;
  on(event: "error", listener: (err: Error) => void): this;
  on(event: string, listener: Function): this;
}

export class Client extends EventEmitter {
  constructor(config?: ClientConstructor);

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

  connect(callback?: ClientConnectCallback): void;
  end(): void;

  pauseDrain(): void;
  resumeDrain(): void;

  on(event: "drain", listener: () => void): this;
  on(event: "error", listener: (err: Error) => void): this;
  on(event: "notification", listener: (message: any) => void): this;
  on(event: "notice", listener: (message: any) => void): this;
  on(event: string, listener: Function): this;
}

export var defaults: Config;
export namespace types {
  /**
   * returns a function used to convert a specific type (specified by oid) into a result javascript type
   * note: the oid can be obtained via the following sql query:
   * `SELECT oid FROM pg_type WHERE typname = 'TYPE_NAME_HERE';`
   */
  export function getTypeParser(oid: number, format?: 'text' | 'binary');
  export function setTypeParser(oid: number, format: 'text' | 'binary', parseFn: (value: string) => any);
  export function setTypeParser(oid: number, parseFn: (value: string) => any);
}
