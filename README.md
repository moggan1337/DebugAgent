# DebugAgent 🐛

**Intelligent Debugging** - Root cause analysis.

## Features

- **🔍 Analysis** - Error analysis
- **💡 Suggestions** - Fix recommendations
- **🔄 Patterns** - Common patterns

## Installation

```bash
npm install debugagent
```

## Usage

```typescript
import { DebugEngine } from 'debugagent';

const debug = new DebugEngine();
const result = debug.analyze('TypeError: Cannot read property x of undefined');

console.log(result.cause);  // 'Null reference'
console.log(result.fix);     // 'Add null check'
```

## License

MIT
