
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Carpool
 * 
 */
export type Carpool = $Result.DefaultSelection<Prisma.$CarpoolPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs>;

  /**
   * `prisma.carpool`: Exposes CRUD operations for the **Carpool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carpools
    * const carpools = await prisma.carpool.findMany()
    * ```
    */
  get carpool(): Prisma.CarpoolDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Event: 'Event',
    Carpool: 'Carpool'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "event" | "carpool"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Carpool: {
        payload: Prisma.$CarpoolPayload<ExtArgs>
        fields: Prisma.CarpoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarpoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarpoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>
          }
          findFirst: {
            args: Prisma.CarpoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarpoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>
          }
          findMany: {
            args: Prisma.CarpoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>[]
          }
          create: {
            args: Prisma.CarpoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>
          }
          createMany: {
            args: Prisma.CarpoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarpoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>[]
          }
          delete: {
            args: Prisma.CarpoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>
          }
          update: {
            args: Prisma.CarpoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>
          }
          deleteMany: {
            args: Prisma.CarpoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarpoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CarpoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarpoolPayload>
          }
          aggregate: {
            args: Prisma.CarpoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarpool>
          }
          groupBy: {
            args: Prisma.CarpoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarpoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarpoolCountArgs<ExtArgs>
            result: $Utils.Optional<CarpoolCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    events: number
    carpools: number
    rsvps: number
    carpoolRides: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | UserCountOutputTypeCountEventsArgs
    carpools?: boolean | UserCountOutputTypeCountCarpoolsArgs
    rsvps?: boolean | UserCountOutputTypeCountRsvpsArgs
    carpoolRides?: boolean | UserCountOutputTypeCountCarpoolRidesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCarpoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarpoolWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRsvpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCarpoolRidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarpoolWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    attendees: number
    carpools: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendees?: boolean | EventCountOutputTypeCountAttendeesArgs
    carpools?: boolean | EventCountOutputTypeCountCarpoolsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountAttendeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountCarpoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarpoolWhereInput
  }


  /**
   * Count Type CarpoolCountOutputType
   */

  export type CarpoolCountOutputType = {
    passengers: number
  }

  export type CarpoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    passengers?: boolean | CarpoolCountOutputTypeCountPassengersArgs
  }

  // Custom InputTypes
  /**
   * CarpoolCountOutputType without action
   */
  export type CarpoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarpoolCountOutputType
     */
    select?: CarpoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CarpoolCountOutputType without action
   */
  export type CarpoolCountOutputTypeCountPassengersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | User$eventsArgs<ExtArgs>
    carpools?: boolean | User$carpoolsArgs<ExtArgs>
    rsvps?: boolean | User$rsvpsArgs<ExtArgs>
    carpoolRides?: boolean | User$carpoolRidesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | User$eventsArgs<ExtArgs>
    carpools?: boolean | User$carpoolsArgs<ExtArgs>
    rsvps?: boolean | User$rsvpsArgs<ExtArgs>
    carpoolRides?: boolean | User$carpoolRidesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      events: Prisma.$EventPayload<ExtArgs>[]
      carpools: Prisma.$CarpoolPayload<ExtArgs>[]
      rsvps: Prisma.$EventPayload<ExtArgs>[]
      carpoolRides: Prisma.$CarpoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany"> | Null>
    carpools<T extends User$carpoolsArgs<ExtArgs> = {}>(args?: Subset<T, User$carpoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findMany"> | Null>
    rsvps<T extends User$rsvpsArgs<ExtArgs> = {}>(args?: Subset<T, User$rsvpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany"> | Null>
    carpoolRides<T extends User$carpoolRidesArgs<ExtArgs> = {}>(args?: Subset<T, User$carpoolRidesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.carpools
   */
  export type User$carpoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    where?: CarpoolWhereInput
    orderBy?: CarpoolOrderByWithRelationInput | CarpoolOrderByWithRelationInput[]
    cursor?: CarpoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarpoolScalarFieldEnum | CarpoolScalarFieldEnum[]
  }

  /**
   * User.rsvps
   */
  export type User$rsvpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.carpoolRides
   */
  export type User$carpoolRidesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    where?: CarpoolWhereInput
    orderBy?: CarpoolOrderByWithRelationInput | CarpoolOrderByWithRelationInput[]
    cursor?: CarpoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarpoolScalarFieldEnum | CarpoolScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    date: Date | null
    time: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
    organizerId: string | null
    isRecurring: boolean | null
    recurrence: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    date: Date | null
    time: string | null
    location: string | null
    createdAt: Date | null
    updatedAt: Date | null
    organizerId: string | null
    isRecurring: boolean | null
    recurrence: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    title: number
    description: number
    date: number
    time: number
    location: number
    createdAt: number
    updatedAt: number
    organizerId: number
    isRecurring: number
    recurrence: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    date?: true
    time?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    organizerId?: true
    isRecurring?: true
    recurrence?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    date?: true
    time?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    organizerId?: true
    isRecurring?: true
    recurrence?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    date?: true
    time?: true
    location?: true
    createdAt?: true
    updatedAt?: true
    organizerId?: true
    isRecurring?: true
    recurrence?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    title: string
    description: string
    date: Date
    time: string
    location: string | null
    createdAt: Date
    updatedAt: Date
    organizerId: string
    isRecurring: boolean
    recurrence: string | null
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    time?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizerId?: boolean
    isRecurring?: boolean
    recurrence?: boolean
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    attendees?: boolean | Event$attendeesArgs<ExtArgs>
    carpools?: boolean | Event$carpoolsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    time?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizerId?: boolean
    isRecurring?: boolean
    recurrence?: boolean
    organizer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    date?: boolean
    time?: boolean
    location?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizerId?: boolean
    isRecurring?: boolean
    recurrence?: boolean
  }

  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    attendees?: boolean | Event$attendeesArgs<ExtArgs>
    carpools?: boolean | Event$carpoolsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      organizer: Prisma.$UserPayload<ExtArgs>
      attendees: Prisma.$UserPayload<ExtArgs>[]
      carpools: Prisma.$CarpoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      date: Date
      time: string
      location: string | null
      createdAt: Date
      updatedAt: Date
      organizerId: string
      isRecurring: boolean
      recurrence: string | null
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    attendees<T extends Event$attendeesArgs<ExtArgs> = {}>(args?: Subset<T, Event$attendeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    carpools<T extends Event$carpoolsArgs<ExtArgs> = {}>(args?: Subset<T, Event$carpoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */ 
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly date: FieldRef<"Event", 'DateTime'>
    readonly time: FieldRef<"Event", 'String'>
    readonly location: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
    readonly organizerId: FieldRef<"Event", 'String'>
    readonly isRecurring: FieldRef<"Event", 'Boolean'>
    readonly recurrence: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
  }

  /**
   * Event.attendees
   */
  export type Event$attendeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Event.carpools
   */
  export type Event$carpoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    where?: CarpoolWhereInput
    orderBy?: CarpoolOrderByWithRelationInput | CarpoolOrderByWithRelationInput[]
    cursor?: CarpoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarpoolScalarFieldEnum | CarpoolScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Carpool
   */

  export type AggregateCarpool = {
    _count: CarpoolCountAggregateOutputType | null
    _avg: CarpoolAvgAggregateOutputType | null
    _sum: CarpoolSumAggregateOutputType | null
    _min: CarpoolMinAggregateOutputType | null
    _max: CarpoolMaxAggregateOutputType | null
  }

  export type CarpoolAvgAggregateOutputType = {
    availableSeats: number | null
  }

  export type CarpoolSumAggregateOutputType = {
    availableSeats: number | null
  }

  export type CarpoolMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    driverId: string | null
    pickupTime: Date | null
    pickupLocation: string | null
    availableSeats: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarpoolMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    driverId: string | null
    pickupTime: Date | null
    pickupLocation: string | null
    availableSeats: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CarpoolCountAggregateOutputType = {
    id: number
    eventId: number
    driverId: number
    pickupTime: number
    pickupLocation: number
    availableSeats: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CarpoolAvgAggregateInputType = {
    availableSeats?: true
  }

  export type CarpoolSumAggregateInputType = {
    availableSeats?: true
  }

  export type CarpoolMinAggregateInputType = {
    id?: true
    eventId?: true
    driverId?: true
    pickupTime?: true
    pickupLocation?: true
    availableSeats?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarpoolMaxAggregateInputType = {
    id?: true
    eventId?: true
    driverId?: true
    pickupTime?: true
    pickupLocation?: true
    availableSeats?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CarpoolCountAggregateInputType = {
    id?: true
    eventId?: true
    driverId?: true
    pickupTime?: true
    pickupLocation?: true
    availableSeats?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CarpoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carpool to aggregate.
     */
    where?: CarpoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carpools to fetch.
     */
    orderBy?: CarpoolOrderByWithRelationInput | CarpoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarpoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carpools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carpools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carpools
    **/
    _count?: true | CarpoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarpoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarpoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarpoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarpoolMaxAggregateInputType
  }

  export type GetCarpoolAggregateType<T extends CarpoolAggregateArgs> = {
        [P in keyof T & keyof AggregateCarpool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarpool[P]>
      : GetScalarType<T[P], AggregateCarpool[P]>
  }




  export type CarpoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarpoolWhereInput
    orderBy?: CarpoolOrderByWithAggregationInput | CarpoolOrderByWithAggregationInput[]
    by: CarpoolScalarFieldEnum[] | CarpoolScalarFieldEnum
    having?: CarpoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarpoolCountAggregateInputType | true
    _avg?: CarpoolAvgAggregateInputType
    _sum?: CarpoolSumAggregateInputType
    _min?: CarpoolMinAggregateInputType
    _max?: CarpoolMaxAggregateInputType
  }

  export type CarpoolGroupByOutputType = {
    id: string
    eventId: string
    driverId: string
    pickupTime: Date
    pickupLocation: string
    availableSeats: number
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: CarpoolCountAggregateOutputType | null
    _avg: CarpoolAvgAggregateOutputType | null
    _sum: CarpoolSumAggregateOutputType | null
    _min: CarpoolMinAggregateOutputType | null
    _max: CarpoolMaxAggregateOutputType | null
  }

  type GetCarpoolGroupByPayload<T extends CarpoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarpoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarpoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarpoolGroupByOutputType[P]>
            : GetScalarType<T[P], CarpoolGroupByOutputType[P]>
        }
      >
    >


  export type CarpoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    driverId?: boolean
    pickupTime?: boolean
    pickupLocation?: boolean
    availableSeats?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    driver?: boolean | UserDefaultArgs<ExtArgs>
    passengers?: boolean | Carpool$passengersArgs<ExtArgs>
    _count?: boolean | CarpoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carpool"]>

  export type CarpoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    driverId?: boolean
    pickupTime?: boolean
    pickupLocation?: boolean
    availableSeats?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    driver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carpool"]>

  export type CarpoolSelectScalar = {
    id?: boolean
    eventId?: boolean
    driverId?: boolean
    pickupTime?: boolean
    pickupLocation?: boolean
    availableSeats?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CarpoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    driver?: boolean | UserDefaultArgs<ExtArgs>
    passengers?: boolean | Carpool$passengersArgs<ExtArgs>
    _count?: boolean | CarpoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CarpoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    driver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CarpoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Carpool"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      driver: Prisma.$UserPayload<ExtArgs>
      passengers: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      driverId: string
      pickupTime: Date
      pickupLocation: string
      availableSeats: number
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["carpool"]>
    composites: {}
  }

  type CarpoolGetPayload<S extends boolean | null | undefined | CarpoolDefaultArgs> = $Result.GetResult<Prisma.$CarpoolPayload, S>

  type CarpoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CarpoolFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CarpoolCountAggregateInputType | true
    }

  export interface CarpoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Carpool'], meta: { name: 'Carpool' } }
    /**
     * Find zero or one Carpool that matches the filter.
     * @param {CarpoolFindUniqueArgs} args - Arguments to find a Carpool
     * @example
     * // Get one Carpool
     * const carpool = await prisma.carpool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarpoolFindUniqueArgs>(args: SelectSubset<T, CarpoolFindUniqueArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Carpool that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CarpoolFindUniqueOrThrowArgs} args - Arguments to find a Carpool
     * @example
     * // Get one Carpool
     * const carpool = await prisma.carpool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarpoolFindUniqueOrThrowArgs>(args: SelectSubset<T, CarpoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Carpool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpoolFindFirstArgs} args - Arguments to find a Carpool
     * @example
     * // Get one Carpool
     * const carpool = await prisma.carpool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarpoolFindFirstArgs>(args?: SelectSubset<T, CarpoolFindFirstArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Carpool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpoolFindFirstOrThrowArgs} args - Arguments to find a Carpool
     * @example
     * // Get one Carpool
     * const carpool = await prisma.carpool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarpoolFindFirstOrThrowArgs>(args?: SelectSubset<T, CarpoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Carpools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carpools
     * const carpools = await prisma.carpool.findMany()
     * 
     * // Get first 10 Carpools
     * const carpools = await prisma.carpool.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carpoolWithIdOnly = await prisma.carpool.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarpoolFindManyArgs>(args?: SelectSubset<T, CarpoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Carpool.
     * @param {CarpoolCreateArgs} args - Arguments to create a Carpool.
     * @example
     * // Create one Carpool
     * const Carpool = await prisma.carpool.create({
     *   data: {
     *     // ... data to create a Carpool
     *   }
     * })
     * 
     */
    create<T extends CarpoolCreateArgs>(args: SelectSubset<T, CarpoolCreateArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Carpools.
     * @param {CarpoolCreateManyArgs} args - Arguments to create many Carpools.
     * @example
     * // Create many Carpools
     * const carpool = await prisma.carpool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarpoolCreateManyArgs>(args?: SelectSubset<T, CarpoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Carpools and returns the data saved in the database.
     * @param {CarpoolCreateManyAndReturnArgs} args - Arguments to create many Carpools.
     * @example
     * // Create many Carpools
     * const carpool = await prisma.carpool.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Carpools and only return the `id`
     * const carpoolWithIdOnly = await prisma.carpool.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarpoolCreateManyAndReturnArgs>(args?: SelectSubset<T, CarpoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Carpool.
     * @param {CarpoolDeleteArgs} args - Arguments to delete one Carpool.
     * @example
     * // Delete one Carpool
     * const Carpool = await prisma.carpool.delete({
     *   where: {
     *     // ... filter to delete one Carpool
     *   }
     * })
     * 
     */
    delete<T extends CarpoolDeleteArgs>(args: SelectSubset<T, CarpoolDeleteArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Carpool.
     * @param {CarpoolUpdateArgs} args - Arguments to update one Carpool.
     * @example
     * // Update one Carpool
     * const carpool = await prisma.carpool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarpoolUpdateArgs>(args: SelectSubset<T, CarpoolUpdateArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Carpools.
     * @param {CarpoolDeleteManyArgs} args - Arguments to filter Carpools to delete.
     * @example
     * // Delete a few Carpools
     * const { count } = await prisma.carpool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarpoolDeleteManyArgs>(args?: SelectSubset<T, CarpoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carpools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carpools
     * const carpool = await prisma.carpool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarpoolUpdateManyArgs>(args: SelectSubset<T, CarpoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Carpool.
     * @param {CarpoolUpsertArgs} args - Arguments to update or create a Carpool.
     * @example
     * // Update or create a Carpool
     * const carpool = await prisma.carpool.upsert({
     *   create: {
     *     // ... data to create a Carpool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Carpool we want to update
     *   }
     * })
     */
    upsert<T extends CarpoolUpsertArgs>(args: SelectSubset<T, CarpoolUpsertArgs<ExtArgs>>): Prisma__CarpoolClient<$Result.GetResult<Prisma.$CarpoolPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Carpools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpoolCountArgs} args - Arguments to filter Carpools to count.
     * @example
     * // Count the number of Carpools
     * const count = await prisma.carpool.count({
     *   where: {
     *     // ... the filter for the Carpools we want to count
     *   }
     * })
    **/
    count<T extends CarpoolCountArgs>(
      args?: Subset<T, CarpoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarpoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Carpool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarpoolAggregateArgs>(args: Subset<T, CarpoolAggregateArgs>): Prisma.PrismaPromise<GetCarpoolAggregateType<T>>

    /**
     * Group by Carpool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarpoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarpoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarpoolGroupByArgs['orderBy'] }
        : { orderBy?: CarpoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarpoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarpoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Carpool model
   */
  readonly fields: CarpoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Carpool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarpoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    driver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    passengers<T extends Carpool$passengersArgs<ExtArgs> = {}>(args?: Subset<T, Carpool$passengersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Carpool model
   */ 
  interface CarpoolFieldRefs {
    readonly id: FieldRef<"Carpool", 'String'>
    readonly eventId: FieldRef<"Carpool", 'String'>
    readonly driverId: FieldRef<"Carpool", 'String'>
    readonly pickupTime: FieldRef<"Carpool", 'DateTime'>
    readonly pickupLocation: FieldRef<"Carpool", 'String'>
    readonly availableSeats: FieldRef<"Carpool", 'Int'>
    readonly notes: FieldRef<"Carpool", 'String'>
    readonly createdAt: FieldRef<"Carpool", 'DateTime'>
    readonly updatedAt: FieldRef<"Carpool", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Carpool findUnique
   */
  export type CarpoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * Filter, which Carpool to fetch.
     */
    where: CarpoolWhereUniqueInput
  }

  /**
   * Carpool findUniqueOrThrow
   */
  export type CarpoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * Filter, which Carpool to fetch.
     */
    where: CarpoolWhereUniqueInput
  }

  /**
   * Carpool findFirst
   */
  export type CarpoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * Filter, which Carpool to fetch.
     */
    where?: CarpoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carpools to fetch.
     */
    orderBy?: CarpoolOrderByWithRelationInput | CarpoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carpools.
     */
    cursor?: CarpoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carpools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carpools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carpools.
     */
    distinct?: CarpoolScalarFieldEnum | CarpoolScalarFieldEnum[]
  }

  /**
   * Carpool findFirstOrThrow
   */
  export type CarpoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * Filter, which Carpool to fetch.
     */
    where?: CarpoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carpools to fetch.
     */
    orderBy?: CarpoolOrderByWithRelationInput | CarpoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carpools.
     */
    cursor?: CarpoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carpools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carpools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carpools.
     */
    distinct?: CarpoolScalarFieldEnum | CarpoolScalarFieldEnum[]
  }

  /**
   * Carpool findMany
   */
  export type CarpoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * Filter, which Carpools to fetch.
     */
    where?: CarpoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carpools to fetch.
     */
    orderBy?: CarpoolOrderByWithRelationInput | CarpoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carpools.
     */
    cursor?: CarpoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carpools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carpools.
     */
    skip?: number
    distinct?: CarpoolScalarFieldEnum | CarpoolScalarFieldEnum[]
  }

  /**
   * Carpool create
   */
  export type CarpoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * The data needed to create a Carpool.
     */
    data: XOR<CarpoolCreateInput, CarpoolUncheckedCreateInput>
  }

  /**
   * Carpool createMany
   */
  export type CarpoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carpools.
     */
    data: CarpoolCreateManyInput | CarpoolCreateManyInput[]
  }

  /**
   * Carpool createManyAndReturn
   */
  export type CarpoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Carpools.
     */
    data: CarpoolCreateManyInput | CarpoolCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Carpool update
   */
  export type CarpoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * The data needed to update a Carpool.
     */
    data: XOR<CarpoolUpdateInput, CarpoolUncheckedUpdateInput>
    /**
     * Choose, which Carpool to update.
     */
    where: CarpoolWhereUniqueInput
  }

  /**
   * Carpool updateMany
   */
  export type CarpoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carpools.
     */
    data: XOR<CarpoolUpdateManyMutationInput, CarpoolUncheckedUpdateManyInput>
    /**
     * Filter which Carpools to update
     */
    where?: CarpoolWhereInput
  }

  /**
   * Carpool upsert
   */
  export type CarpoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * The filter to search for the Carpool to update in case it exists.
     */
    where: CarpoolWhereUniqueInput
    /**
     * In case the Carpool found by the `where` argument doesn't exist, create a new Carpool with this data.
     */
    create: XOR<CarpoolCreateInput, CarpoolUncheckedCreateInput>
    /**
     * In case the Carpool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarpoolUpdateInput, CarpoolUncheckedUpdateInput>
  }

  /**
   * Carpool delete
   */
  export type CarpoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
    /**
     * Filter which Carpool to delete.
     */
    where: CarpoolWhereUniqueInput
  }

  /**
   * Carpool deleteMany
   */
  export type CarpoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carpools to delete
     */
    where?: CarpoolWhereInput
  }

  /**
   * Carpool.passengers
   */
  export type Carpool$passengersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Carpool without action
   */
  export type CarpoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Carpool
     */
    select?: CarpoolSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarpoolInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    date: 'date',
    time: 'time',
    location: 'location',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    organizerId: 'organizerId',
    isRecurring: 'isRecurring',
    recurrence: 'recurrence'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const CarpoolScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    driverId: 'driverId',
    pickupTime: 'pickupTime',
    pickupLocation: 'pickupLocation',
    availableSeats: 'availableSeats',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CarpoolScalarFieldEnum = (typeof CarpoolScalarFieldEnum)[keyof typeof CarpoolScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    events?: EventListRelationFilter
    carpools?: CarpoolListRelationFilter
    rsvps?: EventListRelationFilter
    carpoolRides?: CarpoolListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: EventOrderByRelationAggregateInput
    carpools?: CarpoolOrderByRelationAggregateInput
    rsvps?: EventOrderByRelationAggregateInput
    carpoolRides?: CarpoolOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    events?: EventListRelationFilter
    carpools?: CarpoolListRelationFilter
    rsvps?: EventListRelationFilter
    carpoolRides?: CarpoolListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    description?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    time?: StringFilter<"Event"> | string
    location?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizerId?: StringFilter<"Event"> | string
    isRecurring?: BoolFilter<"Event"> | boolean
    recurrence?: StringNullableFilter<"Event"> | string | null
    organizer?: XOR<UserRelationFilter, UserWhereInput>
    attendees?: UserListRelationFilter
    carpools?: CarpoolListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
    isRecurring?: SortOrder
    recurrence?: SortOrderInput | SortOrder
    organizer?: UserOrderByWithRelationInput
    attendees?: UserOrderByRelationAggregateInput
    carpools?: CarpoolOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    description?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    time?: StringFilter<"Event"> | string
    location?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizerId?: StringFilter<"Event"> | string
    isRecurring?: BoolFilter<"Event"> | boolean
    recurrence?: StringNullableFilter<"Event"> | string | null
    organizer?: XOR<UserRelationFilter, UserWhereInput>
    attendees?: UserListRelationFilter
    carpools?: CarpoolListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
    isRecurring?: SortOrder
    recurrence?: SortOrderInput | SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    title?: StringWithAggregatesFilter<"Event"> | string
    description?: StringWithAggregatesFilter<"Event"> | string
    date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    time?: StringWithAggregatesFilter<"Event"> | string
    location?: StringNullableWithAggregatesFilter<"Event"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    organizerId?: StringWithAggregatesFilter<"Event"> | string
    isRecurring?: BoolWithAggregatesFilter<"Event"> | boolean
    recurrence?: StringNullableWithAggregatesFilter<"Event"> | string | null
  }

  export type CarpoolWhereInput = {
    AND?: CarpoolWhereInput | CarpoolWhereInput[]
    OR?: CarpoolWhereInput[]
    NOT?: CarpoolWhereInput | CarpoolWhereInput[]
    id?: StringFilter<"Carpool"> | string
    eventId?: StringFilter<"Carpool"> | string
    driverId?: StringFilter<"Carpool"> | string
    pickupTime?: DateTimeFilter<"Carpool"> | Date | string
    pickupLocation?: StringFilter<"Carpool"> | string
    availableSeats?: IntFilter<"Carpool"> | number
    notes?: StringNullableFilter<"Carpool"> | string | null
    createdAt?: DateTimeFilter<"Carpool"> | Date | string
    updatedAt?: DateTimeFilter<"Carpool"> | Date | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    driver?: XOR<UserRelationFilter, UserWhereInput>
    passengers?: UserListRelationFilter
  }

  export type CarpoolOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    driverId?: SortOrder
    pickupTime?: SortOrder
    pickupLocation?: SortOrder
    availableSeats?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    event?: EventOrderByWithRelationInput
    driver?: UserOrderByWithRelationInput
    passengers?: UserOrderByRelationAggregateInput
  }

  export type CarpoolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CarpoolWhereInput | CarpoolWhereInput[]
    OR?: CarpoolWhereInput[]
    NOT?: CarpoolWhereInput | CarpoolWhereInput[]
    eventId?: StringFilter<"Carpool"> | string
    driverId?: StringFilter<"Carpool"> | string
    pickupTime?: DateTimeFilter<"Carpool"> | Date | string
    pickupLocation?: StringFilter<"Carpool"> | string
    availableSeats?: IntFilter<"Carpool"> | number
    notes?: StringNullableFilter<"Carpool"> | string | null
    createdAt?: DateTimeFilter<"Carpool"> | Date | string
    updatedAt?: DateTimeFilter<"Carpool"> | Date | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    driver?: XOR<UserRelationFilter, UserWhereInput>
    passengers?: UserListRelationFilter
  }, "id">

  export type CarpoolOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    driverId?: SortOrder
    pickupTime?: SortOrder
    pickupLocation?: SortOrder
    availableSeats?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CarpoolCountOrderByAggregateInput
    _avg?: CarpoolAvgOrderByAggregateInput
    _max?: CarpoolMaxOrderByAggregateInput
    _min?: CarpoolMinOrderByAggregateInput
    _sum?: CarpoolSumOrderByAggregateInput
  }

  export type CarpoolScalarWhereWithAggregatesInput = {
    AND?: CarpoolScalarWhereWithAggregatesInput | CarpoolScalarWhereWithAggregatesInput[]
    OR?: CarpoolScalarWhereWithAggregatesInput[]
    NOT?: CarpoolScalarWhereWithAggregatesInput | CarpoolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Carpool"> | string
    eventId?: StringWithAggregatesFilter<"Carpool"> | string
    driverId?: StringWithAggregatesFilter<"Carpool"> | string
    pickupTime?: DateTimeWithAggregatesFilter<"Carpool"> | Date | string
    pickupLocation?: StringWithAggregatesFilter<"Carpool"> | string
    availableSeats?: IntWithAggregatesFilter<"Carpool"> | number
    notes?: StringNullableWithAggregatesFilter<"Carpool"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Carpool"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Carpool"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutOrganizerInput
    carpools?: CarpoolCreateNestedManyWithoutDriverInput
    rsvps?: EventCreateNestedManyWithoutAttendeesInput
    carpoolRides?: CarpoolCreateNestedManyWithoutPassengersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    carpools?: CarpoolUncheckedCreateNestedManyWithoutDriverInput
    rsvps?: EventUncheckedCreateNestedManyWithoutAttendeesInput
    carpoolRides?: CarpoolUncheckedCreateNestedManyWithoutPassengersInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutOrganizerNestedInput
    carpools?: CarpoolUpdateManyWithoutDriverNestedInput
    rsvps?: EventUpdateManyWithoutAttendeesNestedInput
    carpoolRides?: CarpoolUpdateManyWithoutPassengersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    carpools?: CarpoolUncheckedUpdateManyWithoutDriverNestedInput
    rsvps?: EventUncheckedUpdateManyWithoutAttendeesNestedInput
    carpoolRides?: CarpoolUncheckedUpdateManyWithoutPassengersNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isRecurring?: boolean
    recurrence?: string | null
    organizer: UserCreateNestedOneWithoutEventsInput
    attendees?: UserCreateNestedManyWithoutRsvpsInput
    carpools?: CarpoolCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    isRecurring?: boolean
    recurrence?: string | null
    attendees?: UserUncheckedCreateNestedManyWithoutRsvpsInput
    carpools?: CarpoolUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    organizer?: UserUpdateOneRequiredWithoutEventsNestedInput
    attendees?: UserUpdateManyWithoutRsvpsNestedInput
    carpools?: CarpoolUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: UserUncheckedUpdateManyWithoutRsvpsNestedInput
    carpools?: CarpoolUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    isRecurring?: boolean
    recurrence?: string | null
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarpoolCreateInput = {
    id?: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutCarpoolsInput
    driver: UserCreateNestedOneWithoutCarpoolsInput
    passengers?: UserCreateNestedManyWithoutCarpoolRidesInput
  }

  export type CarpoolUncheckedCreateInput = {
    id?: string
    eventId: string
    driverId: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passengers?: UserUncheckedCreateNestedManyWithoutCarpoolRidesInput
  }

  export type CarpoolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutCarpoolsNestedInput
    driver?: UserUpdateOneRequiredWithoutCarpoolsNestedInput
    passengers?: UserUpdateManyWithoutCarpoolRidesNestedInput
  }

  export type CarpoolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passengers?: UserUncheckedUpdateManyWithoutCarpoolRidesNestedInput
  }

  export type CarpoolCreateManyInput = {
    id?: string
    eventId: string
    driverId: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarpoolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpoolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type CarpoolListRelationFilter = {
    every?: CarpoolWhereInput
    some?: CarpoolWhereInput
    none?: CarpoolWhereInput
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CarpoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
    isRecurring?: SortOrder
    recurrence?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
    isRecurring?: SortOrder
    recurrence?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizerId?: SortOrder
    isRecurring?: SortOrder
    recurrence?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EventRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type CarpoolCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    driverId?: SortOrder
    pickupTime?: SortOrder
    pickupLocation?: SortOrder
    availableSeats?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarpoolAvgOrderByAggregateInput = {
    availableSeats?: SortOrder
  }

  export type CarpoolMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    driverId?: SortOrder
    pickupTime?: SortOrder
    pickupLocation?: SortOrder
    availableSeats?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarpoolMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    driverId?: SortOrder
    pickupTime?: SortOrder
    pickupLocation?: SortOrder
    availableSeats?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CarpoolSumOrderByAggregateInput = {
    availableSeats?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EventCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type CarpoolCreateNestedManyWithoutDriverInput = {
    create?: XOR<CarpoolCreateWithoutDriverInput, CarpoolUncheckedCreateWithoutDriverInput> | CarpoolCreateWithoutDriverInput[] | CarpoolUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutDriverInput | CarpoolCreateOrConnectWithoutDriverInput[]
    createMany?: CarpoolCreateManyDriverInputEnvelope
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutAttendeesInput = {
    create?: XOR<EventCreateWithoutAttendeesInput, EventUncheckedCreateWithoutAttendeesInput> | EventCreateWithoutAttendeesInput[] | EventUncheckedCreateWithoutAttendeesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAttendeesInput | EventCreateOrConnectWithoutAttendeesInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type CarpoolCreateNestedManyWithoutPassengersInput = {
    create?: XOR<CarpoolCreateWithoutPassengersInput, CarpoolUncheckedCreateWithoutPassengersInput> | CarpoolCreateWithoutPassengersInput[] | CarpoolUncheckedCreateWithoutPassengersInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutPassengersInput | CarpoolCreateOrConnectWithoutPassengersInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type CarpoolUncheckedCreateNestedManyWithoutDriverInput = {
    create?: XOR<CarpoolCreateWithoutDriverInput, CarpoolUncheckedCreateWithoutDriverInput> | CarpoolCreateWithoutDriverInput[] | CarpoolUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutDriverInput | CarpoolCreateOrConnectWithoutDriverInput[]
    createMany?: CarpoolCreateManyDriverInputEnvelope
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutAttendeesInput = {
    create?: XOR<EventCreateWithoutAttendeesInput, EventUncheckedCreateWithoutAttendeesInput> | EventCreateWithoutAttendeesInput[] | EventUncheckedCreateWithoutAttendeesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAttendeesInput | EventCreateOrConnectWithoutAttendeesInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type CarpoolUncheckedCreateNestedManyWithoutPassengersInput = {
    create?: XOR<CarpoolCreateWithoutPassengersInput, CarpoolUncheckedCreateWithoutPassengersInput> | CarpoolCreateWithoutPassengersInput[] | CarpoolUncheckedCreateWithoutPassengersInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutPassengersInput | CarpoolCreateOrConnectWithoutPassengersInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EventUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type CarpoolUpdateManyWithoutDriverNestedInput = {
    create?: XOR<CarpoolCreateWithoutDriverInput, CarpoolUncheckedCreateWithoutDriverInput> | CarpoolCreateWithoutDriverInput[] | CarpoolUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutDriverInput | CarpoolCreateOrConnectWithoutDriverInput[]
    upsert?: CarpoolUpsertWithWhereUniqueWithoutDriverInput | CarpoolUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: CarpoolCreateManyDriverInputEnvelope
    set?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    disconnect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    delete?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    update?: CarpoolUpdateWithWhereUniqueWithoutDriverInput | CarpoolUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: CarpoolUpdateManyWithWhereWithoutDriverInput | CarpoolUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
  }

  export type EventUpdateManyWithoutAttendeesNestedInput = {
    create?: XOR<EventCreateWithoutAttendeesInput, EventUncheckedCreateWithoutAttendeesInput> | EventCreateWithoutAttendeesInput[] | EventUncheckedCreateWithoutAttendeesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAttendeesInput | EventCreateOrConnectWithoutAttendeesInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutAttendeesInput | EventUpsertWithWhereUniqueWithoutAttendeesInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutAttendeesInput | EventUpdateWithWhereUniqueWithoutAttendeesInput[]
    updateMany?: EventUpdateManyWithWhereWithoutAttendeesInput | EventUpdateManyWithWhereWithoutAttendeesInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type CarpoolUpdateManyWithoutPassengersNestedInput = {
    create?: XOR<CarpoolCreateWithoutPassengersInput, CarpoolUncheckedCreateWithoutPassengersInput> | CarpoolCreateWithoutPassengersInput[] | CarpoolUncheckedCreateWithoutPassengersInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutPassengersInput | CarpoolCreateOrConnectWithoutPassengersInput[]
    upsert?: CarpoolUpsertWithWhereUniqueWithoutPassengersInput | CarpoolUpsertWithWhereUniqueWithoutPassengersInput[]
    set?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    disconnect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    delete?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    update?: CarpoolUpdateWithWhereUniqueWithoutPassengersInput | CarpoolUpdateWithWhereUniqueWithoutPassengersInput[]
    updateMany?: CarpoolUpdateManyWithWhereWithoutPassengersInput | CarpoolUpdateManyWithWhereWithoutPassengersInput[]
    deleteMany?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput> | EventCreateWithoutOrganizerInput[] | EventUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: EventCreateOrConnectWithoutOrganizerInput | EventCreateOrConnectWithoutOrganizerInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutOrganizerInput | EventUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: EventCreateManyOrganizerInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutOrganizerInput | EventUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: EventUpdateManyWithWhereWithoutOrganizerInput | EventUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type CarpoolUncheckedUpdateManyWithoutDriverNestedInput = {
    create?: XOR<CarpoolCreateWithoutDriverInput, CarpoolUncheckedCreateWithoutDriverInput> | CarpoolCreateWithoutDriverInput[] | CarpoolUncheckedCreateWithoutDriverInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutDriverInput | CarpoolCreateOrConnectWithoutDriverInput[]
    upsert?: CarpoolUpsertWithWhereUniqueWithoutDriverInput | CarpoolUpsertWithWhereUniqueWithoutDriverInput[]
    createMany?: CarpoolCreateManyDriverInputEnvelope
    set?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    disconnect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    delete?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    update?: CarpoolUpdateWithWhereUniqueWithoutDriverInput | CarpoolUpdateWithWhereUniqueWithoutDriverInput[]
    updateMany?: CarpoolUpdateManyWithWhereWithoutDriverInput | CarpoolUpdateManyWithWhereWithoutDriverInput[]
    deleteMany?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutAttendeesNestedInput = {
    create?: XOR<EventCreateWithoutAttendeesInput, EventUncheckedCreateWithoutAttendeesInput> | EventCreateWithoutAttendeesInput[] | EventUncheckedCreateWithoutAttendeesInput[]
    connectOrCreate?: EventCreateOrConnectWithoutAttendeesInput | EventCreateOrConnectWithoutAttendeesInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutAttendeesInput | EventUpsertWithWhereUniqueWithoutAttendeesInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutAttendeesInput | EventUpdateWithWhereUniqueWithoutAttendeesInput[]
    updateMany?: EventUpdateManyWithWhereWithoutAttendeesInput | EventUpdateManyWithWhereWithoutAttendeesInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type CarpoolUncheckedUpdateManyWithoutPassengersNestedInput = {
    create?: XOR<CarpoolCreateWithoutPassengersInput, CarpoolUncheckedCreateWithoutPassengersInput> | CarpoolCreateWithoutPassengersInput[] | CarpoolUncheckedCreateWithoutPassengersInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutPassengersInput | CarpoolCreateOrConnectWithoutPassengersInput[]
    upsert?: CarpoolUpsertWithWhereUniqueWithoutPassengersInput | CarpoolUpsertWithWhereUniqueWithoutPassengersInput[]
    set?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    disconnect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    delete?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    update?: CarpoolUpdateWithWhereUniqueWithoutPassengersInput | CarpoolUpdateWithWhereUniqueWithoutPassengersInput[]
    updateMany?: CarpoolUpdateManyWithWhereWithoutPassengersInput | CarpoolUpdateManyWithWhereWithoutPassengersInput[]
    deleteMany?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutRsvpsInput = {
    create?: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput> | UserCreateWithoutRsvpsInput[] | UserUncheckedCreateWithoutRsvpsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRsvpsInput | UserCreateOrConnectWithoutRsvpsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CarpoolCreateNestedManyWithoutEventInput = {
    create?: XOR<CarpoolCreateWithoutEventInput, CarpoolUncheckedCreateWithoutEventInput> | CarpoolCreateWithoutEventInput[] | CarpoolUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutEventInput | CarpoolCreateOrConnectWithoutEventInput[]
    createMany?: CarpoolCreateManyEventInputEnvelope
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRsvpsInput = {
    create?: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput> | UserCreateWithoutRsvpsInput[] | UserUncheckedCreateWithoutRsvpsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRsvpsInput | UserCreateOrConnectWithoutRsvpsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CarpoolUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<CarpoolCreateWithoutEventInput, CarpoolUncheckedCreateWithoutEventInput> | CarpoolCreateWithoutEventInput[] | CarpoolUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutEventInput | CarpoolCreateOrConnectWithoutEventInput[]
    createMany?: CarpoolCreateManyEventInputEnvelope
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateManyWithoutRsvpsNestedInput = {
    create?: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput> | UserCreateWithoutRsvpsInput[] | UserUncheckedCreateWithoutRsvpsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRsvpsInput | UserCreateOrConnectWithoutRsvpsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRsvpsInput | UserUpsertWithWhereUniqueWithoutRsvpsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRsvpsInput | UserUpdateWithWhereUniqueWithoutRsvpsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRsvpsInput | UserUpdateManyWithWhereWithoutRsvpsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CarpoolUpdateManyWithoutEventNestedInput = {
    create?: XOR<CarpoolCreateWithoutEventInput, CarpoolUncheckedCreateWithoutEventInput> | CarpoolCreateWithoutEventInput[] | CarpoolUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutEventInput | CarpoolCreateOrConnectWithoutEventInput[]
    upsert?: CarpoolUpsertWithWhereUniqueWithoutEventInput | CarpoolUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: CarpoolCreateManyEventInputEnvelope
    set?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    disconnect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    delete?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    update?: CarpoolUpdateWithWhereUniqueWithoutEventInput | CarpoolUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: CarpoolUpdateManyWithWhereWithoutEventInput | CarpoolUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRsvpsNestedInput = {
    create?: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput> | UserCreateWithoutRsvpsInput[] | UserUncheckedCreateWithoutRsvpsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRsvpsInput | UserCreateOrConnectWithoutRsvpsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRsvpsInput | UserUpsertWithWhereUniqueWithoutRsvpsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRsvpsInput | UserUpdateWithWhereUniqueWithoutRsvpsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRsvpsInput | UserUpdateManyWithWhereWithoutRsvpsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CarpoolUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<CarpoolCreateWithoutEventInput, CarpoolUncheckedCreateWithoutEventInput> | CarpoolCreateWithoutEventInput[] | CarpoolUncheckedCreateWithoutEventInput[]
    connectOrCreate?: CarpoolCreateOrConnectWithoutEventInput | CarpoolCreateOrConnectWithoutEventInput[]
    upsert?: CarpoolUpsertWithWhereUniqueWithoutEventInput | CarpoolUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: CarpoolCreateManyEventInputEnvelope
    set?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    disconnect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    delete?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    connect?: CarpoolWhereUniqueInput | CarpoolWhereUniqueInput[]
    update?: CarpoolUpdateWithWhereUniqueWithoutEventInput | CarpoolUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: CarpoolUpdateManyWithWhereWithoutEventInput | CarpoolUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutCarpoolsInput = {
    create?: XOR<EventCreateWithoutCarpoolsInput, EventUncheckedCreateWithoutCarpoolsInput>
    connectOrCreate?: EventCreateOrConnectWithoutCarpoolsInput
    connect?: EventWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCarpoolsInput = {
    create?: XOR<UserCreateWithoutCarpoolsInput, UserUncheckedCreateWithoutCarpoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCarpoolsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutCarpoolRidesInput = {
    create?: XOR<UserCreateWithoutCarpoolRidesInput, UserUncheckedCreateWithoutCarpoolRidesInput> | UserCreateWithoutCarpoolRidesInput[] | UserUncheckedCreateWithoutCarpoolRidesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCarpoolRidesInput | UserCreateOrConnectWithoutCarpoolRidesInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCarpoolRidesInput = {
    create?: XOR<UserCreateWithoutCarpoolRidesInput, UserUncheckedCreateWithoutCarpoolRidesInput> | UserCreateWithoutCarpoolRidesInput[] | UserUncheckedCreateWithoutCarpoolRidesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCarpoolRidesInput | UserCreateOrConnectWithoutCarpoolRidesInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUpdateOneRequiredWithoutCarpoolsNestedInput = {
    create?: XOR<EventCreateWithoutCarpoolsInput, EventUncheckedCreateWithoutCarpoolsInput>
    connectOrCreate?: EventCreateOrConnectWithoutCarpoolsInput
    upsert?: EventUpsertWithoutCarpoolsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutCarpoolsInput, EventUpdateWithoutCarpoolsInput>, EventUncheckedUpdateWithoutCarpoolsInput>
  }

  export type UserUpdateOneRequiredWithoutCarpoolsNestedInput = {
    create?: XOR<UserCreateWithoutCarpoolsInput, UserUncheckedCreateWithoutCarpoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCarpoolsInput
    upsert?: UserUpsertWithoutCarpoolsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCarpoolsInput, UserUpdateWithoutCarpoolsInput>, UserUncheckedUpdateWithoutCarpoolsInput>
  }

  export type UserUpdateManyWithoutCarpoolRidesNestedInput = {
    create?: XOR<UserCreateWithoutCarpoolRidesInput, UserUncheckedCreateWithoutCarpoolRidesInput> | UserCreateWithoutCarpoolRidesInput[] | UserUncheckedCreateWithoutCarpoolRidesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCarpoolRidesInput | UserCreateOrConnectWithoutCarpoolRidesInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCarpoolRidesInput | UserUpsertWithWhereUniqueWithoutCarpoolRidesInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCarpoolRidesInput | UserUpdateWithWhereUniqueWithoutCarpoolRidesInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCarpoolRidesInput | UserUpdateManyWithWhereWithoutCarpoolRidesInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCarpoolRidesNestedInput = {
    create?: XOR<UserCreateWithoutCarpoolRidesInput, UserUncheckedCreateWithoutCarpoolRidesInput> | UserCreateWithoutCarpoolRidesInput[] | UserUncheckedCreateWithoutCarpoolRidesInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCarpoolRidesInput | UserCreateOrConnectWithoutCarpoolRidesInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCarpoolRidesInput | UserUpsertWithWhereUniqueWithoutCarpoolRidesInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCarpoolRidesInput | UserUpdateWithWhereUniqueWithoutCarpoolRidesInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCarpoolRidesInput | UserUpdateManyWithWhereWithoutCarpoolRidesInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EventCreateWithoutOrganizerInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isRecurring?: boolean
    recurrence?: string | null
    attendees?: UserCreateNestedManyWithoutRsvpsInput
    carpools?: CarpoolCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutOrganizerInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isRecurring?: boolean
    recurrence?: string | null
    attendees?: UserUncheckedCreateNestedManyWithoutRsvpsInput
    carpools?: CarpoolUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type EventCreateManyOrganizerInputEnvelope = {
    data: EventCreateManyOrganizerInput | EventCreateManyOrganizerInput[]
  }

  export type CarpoolCreateWithoutDriverInput = {
    id?: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutCarpoolsInput
    passengers?: UserCreateNestedManyWithoutCarpoolRidesInput
  }

  export type CarpoolUncheckedCreateWithoutDriverInput = {
    id?: string
    eventId: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passengers?: UserUncheckedCreateNestedManyWithoutCarpoolRidesInput
  }

  export type CarpoolCreateOrConnectWithoutDriverInput = {
    where: CarpoolWhereUniqueInput
    create: XOR<CarpoolCreateWithoutDriverInput, CarpoolUncheckedCreateWithoutDriverInput>
  }

  export type CarpoolCreateManyDriverInputEnvelope = {
    data: CarpoolCreateManyDriverInput | CarpoolCreateManyDriverInput[]
  }

  export type EventCreateWithoutAttendeesInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isRecurring?: boolean
    recurrence?: string | null
    organizer: UserCreateNestedOneWithoutEventsInput
    carpools?: CarpoolCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutAttendeesInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    isRecurring?: boolean
    recurrence?: string | null
    carpools?: CarpoolUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutAttendeesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutAttendeesInput, EventUncheckedCreateWithoutAttendeesInput>
  }

  export type CarpoolCreateWithoutPassengersInput = {
    id?: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutCarpoolsInput
    driver: UserCreateNestedOneWithoutCarpoolsInput
  }

  export type CarpoolUncheckedCreateWithoutPassengersInput = {
    id?: string
    eventId: string
    driverId: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CarpoolCreateOrConnectWithoutPassengersInput = {
    where: CarpoolWhereUniqueInput
    create: XOR<CarpoolCreateWithoutPassengersInput, CarpoolUncheckedCreateWithoutPassengersInput>
  }

  export type EventUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
    create: XOR<EventCreateWithoutOrganizerInput, EventUncheckedCreateWithoutOrganizerInput>
  }

  export type EventUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutOrganizerInput, EventUncheckedUpdateWithoutOrganizerInput>
  }

  export type EventUpdateManyWithWhereWithoutOrganizerInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutOrganizerInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    description?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    time?: StringFilter<"Event"> | string
    location?: StringNullableFilter<"Event"> | string | null
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    organizerId?: StringFilter<"Event"> | string
    isRecurring?: BoolFilter<"Event"> | boolean
    recurrence?: StringNullableFilter<"Event"> | string | null
  }

  export type CarpoolUpsertWithWhereUniqueWithoutDriverInput = {
    where: CarpoolWhereUniqueInput
    update: XOR<CarpoolUpdateWithoutDriverInput, CarpoolUncheckedUpdateWithoutDriverInput>
    create: XOR<CarpoolCreateWithoutDriverInput, CarpoolUncheckedCreateWithoutDriverInput>
  }

  export type CarpoolUpdateWithWhereUniqueWithoutDriverInput = {
    where: CarpoolWhereUniqueInput
    data: XOR<CarpoolUpdateWithoutDriverInput, CarpoolUncheckedUpdateWithoutDriverInput>
  }

  export type CarpoolUpdateManyWithWhereWithoutDriverInput = {
    where: CarpoolScalarWhereInput
    data: XOR<CarpoolUpdateManyMutationInput, CarpoolUncheckedUpdateManyWithoutDriverInput>
  }

  export type CarpoolScalarWhereInput = {
    AND?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
    OR?: CarpoolScalarWhereInput[]
    NOT?: CarpoolScalarWhereInput | CarpoolScalarWhereInput[]
    id?: StringFilter<"Carpool"> | string
    eventId?: StringFilter<"Carpool"> | string
    driverId?: StringFilter<"Carpool"> | string
    pickupTime?: DateTimeFilter<"Carpool"> | Date | string
    pickupLocation?: StringFilter<"Carpool"> | string
    availableSeats?: IntFilter<"Carpool"> | number
    notes?: StringNullableFilter<"Carpool"> | string | null
    createdAt?: DateTimeFilter<"Carpool"> | Date | string
    updatedAt?: DateTimeFilter<"Carpool"> | Date | string
  }

  export type EventUpsertWithWhereUniqueWithoutAttendeesInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutAttendeesInput, EventUncheckedUpdateWithoutAttendeesInput>
    create: XOR<EventCreateWithoutAttendeesInput, EventUncheckedCreateWithoutAttendeesInput>
  }

  export type EventUpdateWithWhereUniqueWithoutAttendeesInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutAttendeesInput, EventUncheckedUpdateWithoutAttendeesInput>
  }

  export type EventUpdateManyWithWhereWithoutAttendeesInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutAttendeesInput>
  }

  export type CarpoolUpsertWithWhereUniqueWithoutPassengersInput = {
    where: CarpoolWhereUniqueInput
    update: XOR<CarpoolUpdateWithoutPassengersInput, CarpoolUncheckedUpdateWithoutPassengersInput>
    create: XOR<CarpoolCreateWithoutPassengersInput, CarpoolUncheckedCreateWithoutPassengersInput>
  }

  export type CarpoolUpdateWithWhereUniqueWithoutPassengersInput = {
    where: CarpoolWhereUniqueInput
    data: XOR<CarpoolUpdateWithoutPassengersInput, CarpoolUncheckedUpdateWithoutPassengersInput>
  }

  export type CarpoolUpdateManyWithWhereWithoutPassengersInput = {
    where: CarpoolScalarWhereInput
    data: XOR<CarpoolUpdateManyMutationInput, CarpoolUncheckedUpdateManyWithoutPassengersInput>
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    carpools?: CarpoolCreateNestedManyWithoutDriverInput
    rsvps?: EventCreateNestedManyWithoutAttendeesInput
    carpoolRides?: CarpoolCreateNestedManyWithoutPassengersInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    carpools?: CarpoolUncheckedCreateNestedManyWithoutDriverInput
    rsvps?: EventUncheckedCreateNestedManyWithoutAttendeesInput
    carpoolRides?: CarpoolUncheckedCreateNestedManyWithoutPassengersInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type UserCreateWithoutRsvpsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutOrganizerInput
    carpools?: CarpoolCreateNestedManyWithoutDriverInput
    carpoolRides?: CarpoolCreateNestedManyWithoutPassengersInput
  }

  export type UserUncheckedCreateWithoutRsvpsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    carpools?: CarpoolUncheckedCreateNestedManyWithoutDriverInput
    carpoolRides?: CarpoolUncheckedCreateNestedManyWithoutPassengersInput
  }

  export type UserCreateOrConnectWithoutRsvpsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput>
  }

  export type CarpoolCreateWithoutEventInput = {
    id?: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    driver: UserCreateNestedOneWithoutCarpoolsInput
    passengers?: UserCreateNestedManyWithoutCarpoolRidesInput
  }

  export type CarpoolUncheckedCreateWithoutEventInput = {
    id?: string
    driverId: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    passengers?: UserUncheckedCreateNestedManyWithoutCarpoolRidesInput
  }

  export type CarpoolCreateOrConnectWithoutEventInput = {
    where: CarpoolWhereUniqueInput
    create: XOR<CarpoolCreateWithoutEventInput, CarpoolUncheckedCreateWithoutEventInput>
  }

  export type CarpoolCreateManyEventInputEnvelope = {
    data: CarpoolCreateManyEventInput | CarpoolCreateManyEventInput[]
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carpools?: CarpoolUpdateManyWithoutDriverNestedInput
    rsvps?: EventUpdateManyWithoutAttendeesNestedInput
    carpoolRides?: CarpoolUpdateManyWithoutPassengersNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    carpools?: CarpoolUncheckedUpdateManyWithoutDriverNestedInput
    rsvps?: EventUncheckedUpdateManyWithoutAttendeesNestedInput
    carpoolRides?: CarpoolUncheckedUpdateManyWithoutPassengersNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutRsvpsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRsvpsInput, UserUncheckedUpdateWithoutRsvpsInput>
    create: XOR<UserCreateWithoutRsvpsInput, UserUncheckedCreateWithoutRsvpsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRsvpsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRsvpsInput, UserUncheckedUpdateWithoutRsvpsInput>
  }

  export type UserUpdateManyWithWhereWithoutRsvpsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRsvpsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type CarpoolUpsertWithWhereUniqueWithoutEventInput = {
    where: CarpoolWhereUniqueInput
    update: XOR<CarpoolUpdateWithoutEventInput, CarpoolUncheckedUpdateWithoutEventInput>
    create: XOR<CarpoolCreateWithoutEventInput, CarpoolUncheckedCreateWithoutEventInput>
  }

  export type CarpoolUpdateWithWhereUniqueWithoutEventInput = {
    where: CarpoolWhereUniqueInput
    data: XOR<CarpoolUpdateWithoutEventInput, CarpoolUncheckedUpdateWithoutEventInput>
  }

  export type CarpoolUpdateManyWithWhereWithoutEventInput = {
    where: CarpoolScalarWhereInput
    data: XOR<CarpoolUpdateManyMutationInput, CarpoolUncheckedUpdateManyWithoutEventInput>
  }

  export type EventCreateWithoutCarpoolsInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isRecurring?: boolean
    recurrence?: string | null
    organizer: UserCreateNestedOneWithoutEventsInput
    attendees?: UserCreateNestedManyWithoutRsvpsInput
  }

  export type EventUncheckedCreateWithoutCarpoolsInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizerId: string
    isRecurring?: boolean
    recurrence?: string | null
    attendees?: UserUncheckedCreateNestedManyWithoutRsvpsInput
  }

  export type EventCreateOrConnectWithoutCarpoolsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutCarpoolsInput, EventUncheckedCreateWithoutCarpoolsInput>
  }

  export type UserCreateWithoutCarpoolsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutOrganizerInput
    rsvps?: EventCreateNestedManyWithoutAttendeesInput
    carpoolRides?: CarpoolCreateNestedManyWithoutPassengersInput
  }

  export type UserUncheckedCreateWithoutCarpoolsInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    rsvps?: EventUncheckedCreateNestedManyWithoutAttendeesInput
    carpoolRides?: CarpoolUncheckedCreateNestedManyWithoutPassengersInput
  }

  export type UserCreateOrConnectWithoutCarpoolsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCarpoolsInput, UserUncheckedCreateWithoutCarpoolsInput>
  }

  export type UserCreateWithoutCarpoolRidesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventCreateNestedManyWithoutOrganizerInput
    carpools?: CarpoolCreateNestedManyWithoutDriverInput
    rsvps?: EventCreateNestedManyWithoutAttendeesInput
  }

  export type UserUncheckedCreateWithoutCarpoolRidesInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EventUncheckedCreateNestedManyWithoutOrganizerInput
    carpools?: CarpoolUncheckedCreateNestedManyWithoutDriverInput
    rsvps?: EventUncheckedCreateNestedManyWithoutAttendeesInput
  }

  export type UserCreateOrConnectWithoutCarpoolRidesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCarpoolRidesInput, UserUncheckedCreateWithoutCarpoolRidesInput>
  }

  export type EventUpsertWithoutCarpoolsInput = {
    update: XOR<EventUpdateWithoutCarpoolsInput, EventUncheckedUpdateWithoutCarpoolsInput>
    create: XOR<EventCreateWithoutCarpoolsInput, EventUncheckedCreateWithoutCarpoolsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutCarpoolsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutCarpoolsInput, EventUncheckedUpdateWithoutCarpoolsInput>
  }

  export type EventUpdateWithoutCarpoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    organizer?: UserUpdateOneRequiredWithoutEventsNestedInput
    attendees?: UserUpdateManyWithoutRsvpsNestedInput
  }

  export type EventUncheckedUpdateWithoutCarpoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: UserUncheckedUpdateManyWithoutRsvpsNestedInput
  }

  export type UserUpsertWithoutCarpoolsInput = {
    update: XOR<UserUpdateWithoutCarpoolsInput, UserUncheckedUpdateWithoutCarpoolsInput>
    create: XOR<UserCreateWithoutCarpoolsInput, UserUncheckedCreateWithoutCarpoolsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCarpoolsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCarpoolsInput, UserUncheckedUpdateWithoutCarpoolsInput>
  }

  export type UserUpdateWithoutCarpoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutOrganizerNestedInput
    rsvps?: EventUpdateManyWithoutAttendeesNestedInput
    carpoolRides?: CarpoolUpdateManyWithoutPassengersNestedInput
  }

  export type UserUncheckedUpdateWithoutCarpoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    rsvps?: EventUncheckedUpdateManyWithoutAttendeesNestedInput
    carpoolRides?: CarpoolUncheckedUpdateManyWithoutPassengersNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutCarpoolRidesInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCarpoolRidesInput, UserUncheckedUpdateWithoutCarpoolRidesInput>
    create: XOR<UserCreateWithoutCarpoolRidesInput, UserUncheckedCreateWithoutCarpoolRidesInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCarpoolRidesInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCarpoolRidesInput, UserUncheckedUpdateWithoutCarpoolRidesInput>
  }

  export type UserUpdateManyWithWhereWithoutCarpoolRidesInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCarpoolRidesInput>
  }

  export type EventCreateManyOrganizerInput = {
    id?: string
    title: string
    description: string
    date: Date | string
    time: string
    location?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isRecurring?: boolean
    recurrence?: string | null
  }

  export type CarpoolCreateManyDriverInput = {
    id?: string
    eventId: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventUpdateWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: UserUpdateManyWithoutRsvpsNestedInput
    carpools?: CarpoolUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    attendees?: UserUncheckedUpdateManyWithoutRsvpsNestedInput
    carpools?: CarpoolUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutOrganizerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarpoolUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutCarpoolsNestedInput
    passengers?: UserUpdateManyWithoutCarpoolRidesNestedInput
  }

  export type CarpoolUncheckedUpdateWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passengers?: UserUncheckedUpdateManyWithoutCarpoolRidesNestedInput
  }

  export type CarpoolUncheckedUpdateManyWithoutDriverInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutAttendeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    organizer?: UserUpdateOneRequiredWithoutEventsNestedInput
    carpools?: CarpoolUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutAttendeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
    carpools?: CarpoolUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutAttendeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizerId?: StringFieldUpdateOperationsInput | string
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    recurrence?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarpoolUpdateWithoutPassengersInput = {
    id?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutCarpoolsNestedInput
    driver?: UserUpdateOneRequiredWithoutCarpoolsNestedInput
  }

  export type CarpoolUncheckedUpdateWithoutPassengersInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpoolUncheckedUpdateManyWithoutPassengersInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpoolCreateManyEventInput = {
    id?: string
    driverId: string
    pickupTime: Date | string
    pickupLocation: string
    availableSeats: number
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutRsvpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutOrganizerNestedInput
    carpools?: CarpoolUpdateManyWithoutDriverNestedInput
    carpoolRides?: CarpoolUpdateManyWithoutPassengersNestedInput
  }

  export type UserUncheckedUpdateWithoutRsvpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    carpools?: CarpoolUncheckedUpdateManyWithoutDriverNestedInput
    carpoolRides?: CarpoolUncheckedUpdateManyWithoutPassengersNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRsvpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarpoolUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    driver?: UserUpdateOneRequiredWithoutCarpoolsNestedInput
    passengers?: UserUpdateManyWithoutCarpoolRidesNestedInput
  }

  export type CarpoolUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    passengers?: UserUncheckedUpdateManyWithoutCarpoolRidesNestedInput
  }

  export type CarpoolUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    driverId?: StringFieldUpdateOperationsInput | string
    pickupTime?: DateTimeFieldUpdateOperationsInput | Date | string
    pickupLocation?: StringFieldUpdateOperationsInput | string
    availableSeats?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutCarpoolRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUpdateManyWithoutOrganizerNestedInput
    carpools?: CarpoolUpdateManyWithoutDriverNestedInput
    rsvps?: EventUpdateManyWithoutAttendeesNestedInput
  }

  export type UserUncheckedUpdateWithoutCarpoolRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EventUncheckedUpdateManyWithoutOrganizerNestedInput
    carpools?: CarpoolUncheckedUpdateManyWithoutDriverNestedInput
    rsvps?: EventUncheckedUpdateManyWithoutAttendeesNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCarpoolRidesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventCountOutputTypeDefaultArgs instead
     */
    export type EventCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CarpoolCountOutputTypeDefaultArgs instead
     */
    export type CarpoolCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CarpoolCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventDefaultArgs instead
     */
    export type EventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CarpoolDefaultArgs instead
     */
    export type CarpoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CarpoolDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}