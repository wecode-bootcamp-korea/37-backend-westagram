# Dbmate

Nodejs wrapper for [amacneil/dbmate](https://github.com/amacneil/dbmate)

## Library

```typescript
import { DbMate } from 'dbmate';

// construct a dbmate instance using a database url string
// see https://github.com/amacneil/dbmate#usage for more details
const dbmate = new DbMate('db://user:pass@host:port/db?opt');

// invoke up, down, drop as necessary
await dbmate.up();
```

## CLI

The `dbmate` cli wraps the precompiled dbmate binaries and passes all command line options. The cli wrapper will detect the appropriate binary for your system.

## License

See LICENSE.md
