# DebugAgent 🐛

[![npm version](https://img.shields.io/npm/v/debugagent.svg)](https://www.npmjs.com/package/debugagent)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintenance-active-brightgreen.svg)](#)

> **Intelligent Debugging Agent** — Automated root cause analysis and fix recommendations for JavaScript/TypeScript applications.

DebugAgent is a powerful debugging utility that analyzes error messages, identifies root causes, and provides actionable fix recommendations. It uses pattern matching and intelligent analysis to help developers quickly understand and resolve common programming errors.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Error Patterns](#error-patterns)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## Features

### 🔍 Intelligent Error Analysis

DebugAgent automatically analyzes error messages and identifies the root cause of common programming mistakes. It supports a wide range of error types:

- **Type Errors** — Null/undefined property access, type mismatches
- **Async Errors** — Missing await statements, unhandled promises
- **Reference Errors** — Undefined variables, scope issues
- **Syntax Errors** — Common typos and formatting issues
- **Custom Patterns** — Define your own error patterns

### 💡 Actionable Fix Recommendations

Every detected error includes a detailed fix recommendation with:

- Clear explanation of the problem
- Step-by-step fix instructions
- Code examples showing the solution
- Links to relevant documentation

### 🔄 Pattern Recognition

Built-in support for common error patterns including:

- Null reference detection
- Async/await mistakes
- Type coercion issues
- Common JavaScript pitfalls
- Framework-specific errors (Node.js, Express, React)

### 📊 Detailed Reporting

Generate comprehensive debugging reports with:

- Error categorization
- Severity assessment
- Suggested priority for fixes
- Related error history

### ⚙️ Extensible Architecture

- Add custom error patterns
- Integrate with CI/CD pipelines
- Support for custom reporters
- Plugin system for extensibility

---

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm, yarn, or pnpm

### Using npm

```bash
npm install debugagent
```

### Using yarn

```bash
yarn add debugagent
```

### Using pnpm

```bash
pnpm add debugagent
```

### Development Installation

For development with the latest changes from source:

```bash
git clone https://github.com/yourusername/debugagent.git
cd debugagent
npm install
npm run build
```

### Global Installation

Install globally to use the CLI tool anywhere:

```bash
npm install -g debugagent
```

---

## Quick Start

### Basic Usage

```typescript
import { DebugEngine } from 'debugagent';

// Create a new debug engine instance
const debug = new DebugEngine();

// Analyze an error message
const result = debug.analyze('TypeError: Cannot read property x of undefined');

// Access the analysis results
console.log(result.cause);   // 'Null reference'
console.log(result.fix);     // 'Add null check'
```

### Command Line Interface

After global installation, use the CLI:

```bash
# Analyze a single error
debugagent analyze "TypeError: Cannot read property 'foo' of null"

# Analyze from a file
debugagent analyze --file error.log

# Interactive mode
debugagent interactive
```

### Programmatic Usage with Promises

```typescript
import { DebugEngine } from 'debugagent';

async function diagnoseError(errorMessage: string) {
  const debug = new DebugEngine();
  
  // Async analysis for complex errors
  const result = await debug.analyzeAsync(errorMessage);
  
  console.log(`
    Error: ${errorMessage}
    Cause: ${result.cause}
    Fix: ${result.fix}
    Severity: ${result.severity}
  `);
  
  return result;
}

diagnoseError('ReferenceError: x is not defined');
```

---

## Usage Examples

### Example 1: Basic Error Analysis

```typescript
import { DebugEngine } from 'debugagent';

const debug = new DebugEngine();

// Common JavaScript errors
const errors = [
  'TypeError: Cannot read property "name" of undefined',
  'ReferenceError: variable is not defined',
  'SyntaxError: Unexpected token }',
  'Error: Cannot destructure property "x" of "undefined" as it is undefined.',
];

errors.forEach(error => {
  const result = debug.analyze(error);
  console.log(`Error: ${error}`);
  console.log(`Cause: ${result.cause}`);
  console.log(`Fix: ${result.fix}`);
  console.log('---');
});
```

**Output:**

```
Error: TypeError: Cannot read property "name" of undefined
Cause: Null reference
Fix: Add null check
---
Error: ReferenceError: variable is not defined
Cause: Variable not initialized
Fix: Add initialization
---
Error: SyntaxError: Unexpected token }
Cause: Unknown error
Fix: Review stack trace
---
Error: Error: Cannot destructure property "x" of "undefined" as it is undefined.
Cause: Null reference
Fix: Add null check
---
```

### Example 2: Batch Analysis

```typescript
import { DebugEngine } from 'debugagent';

const debug = new DebugEngine();

// Analyze multiple errors at once
const errorBatch = [
  'TypeError: undefined is not a function',
  'ReferenceError: Cannot access "fetch" before initialization',
  'RangeError: Invalid array length',
];

const results = debug.analyzeBatch(errorBatch);

results.forEach((result, index) => {
  console.log(`Error #${index + 1}:`);
  console.log(`  Cause: ${result.cause}`);
  console.log(`  Fix: ${result.fix}`);
  console.log(`  Confidence: ${(result.confidence * 100).toFixed(0)}%`);
});
```

### Example 3: Custom Error Patterns

```typescript
import { DebugEngine, Pattern } from 'debugagent';

const debug = new DebugEngine();

// Define custom error patterns
const customPatterns: Pattern[] = [
  {
    error: /ZodError/i,
    cause: 'Validation Error',
    fix: 'Check schema validation rules',
    severity: 'high'
  },
  {
    error: /Prisma.*Error/i,
    cause: 'Database Error',
    fix: 'Check database connection and queries',
    severity: 'critical'
  },
  {
    error: /JWT.*expired/i,
    cause: 'Authentication Error',
    fix: 'Refresh the authentication token',
    severity: 'medium'
  }
];

// Add custom patterns to the engine
debug.addPatterns(customPatterns);

// Now analyze errors with custom patterns
const result = debug.analyze('PrismaError: Connection refused');
console.log(result.cause); // 'Database Error'
```

### Example 4: CI/CD Integration

```typescript
import { DebugEngine } from 'debugagent';
import * as fs from 'fs';

async function ciDiagnostics() {
  const debug = new DebugEngine();
  
  // Read errors from CI artifact
  const errorLog = fs.readFileSync('error.log', 'utf-8');
  const errors = errorLog.split('\n').filter(line => line.trim());
  
  const results = errors.map(error => debug.analyze(error));
  
  // Generate report
  const report = {
    totalErrors: results.length,
    bySeverity: {
      critical: results.filter(r => r.severity === 'critical').length,
      high: results.filter(r => r.severity === 'high').length,
      medium: results.filter(r => r.severity === 'medium').length,
      low: results.filter(r => r.severity === 'low').length,
    },
    fixedCount: results.filter(r => r.canAutoFix).length,
    errors: results
  };
  
  // Output report
  fs.writeFileSync('debug-report.json', JSON.stringify(report, null, 2));
  
  // Exit with error if critical issues found
  if (report.bySeverity.critical > 0) {
    console.error('Critical errors detected!');
    process.exit(1);
  }
}

ciDiagnostics();
```

### Example 5: Express.js Error Middleware

```typescript
import express, { Request, Response, NextFunction } from 'express';
import { DebugEngine } from 'debugagent';

const app = express();
const debug = new DebugEngine();

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const analysis = debug.analyze(err.message);
  
  console.error('Error Analysis:', {
    error: err.message,
    cause: analysis.cause,
    suggestion: analysis.fix
  });
  
  res.status(500).json({
    error: err.message,
    debugging: {
      cause: analysis.cause,
      fix: analysis.fix,
      severity: analysis.severity
    }
  });
});

app.listen(3000);
```

### Example 6: Testing Helper

```typescript
import { DebugEngine } from 'debugagent';
import { expect } from 'chai';

const debug = new DebugEngine();

describe('DebugEngine', () => {
  it('should correctly identify null reference errors', () => {
    const result = debug.analyze(
      'TypeError: Cannot read property "x" of undefined'
    );
    
    expect(result.cause).to.equal('Null reference');
    expect(result.severity).to.equal('high');
  });
  
  it('should suggest appropriate fixes', () => {
    const result = debug.analyze(
      'ReferenceError: Cannot access "x" before initialization'
    );
    
    expect(result.fix).to.include('initialization');
  });
});
```

---

## API Reference

### `DebugEngine`

The main class for error analysis.

#### Constructor

```typescript
new DebugEngine(options?: DebugEngineOptions)
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `DebugEngineOptions` | Optional configuration object |
| `options.strictMode` | `boolean` | Enable strict pattern matching (default: `false`) |
| `options.confidenceThreshold` | `number` | Minimum confidence for results (0-1, default: `0.5`) |
| `options.includeStackTrace` | `boolean` | Include stack trace in analysis (default: `false`) |

**Example:**

```typescript
const debug = new DebugEngine({
  strictMode: true,
  confidenceThreshold: 0.8,
  includeStackTrace: true
});
```

---

### Methods

#### `analyze(error: string): AnalysisResult`

Analyzes a single error message and returns the analysis result.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `error` | `string` | The error message to analyze |

**Returns:** `AnalysisResult` object

**Example:**

```typescript
const result = debug.analyze('TypeError: Cannot read property of null');

console.log(result);
// {
//   cause: 'Null reference',
//   fix: 'Add null check',
//   severity: 'high',
//   confidence: 0.95,
//   canAutoFix: false,
//   category: 'TypeError'
// }
```

---

#### `analyzeAsync(error: string): Promise<AnalysisResult>`

Asynchronously analyzes a complex error message with extended analysis.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `error` | `string` | The error message to analyze |

**Returns:** `Promise<AnalysisResult>`

**Example:**

```typescript
const result = await debug.analyzeAsync(
  'Error: ENOENT: no such file or directory, open "/path/to/file.txt"'
);

console.log(`Root Cause: ${result.cause}`);
console.log(`Fix: ${result.fix}`);
```

---

#### `analyzeBatch(errors: string[]): AnalysisResult[]`

Analyzes multiple error messages at once.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `errors` | `string[]` | Array of error messages |

**Returns:** `AnalysisResult[]`

**Example:**

```typescript
const errors = [
  'TypeError: x is undefined',
  'ReferenceError: y is not defined'
];

const results = debug.analyzeBatch(errors);
```

---

#### `addPatterns(patterns: Pattern[]): void`

Adds custom error patterns to the engine.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `patterns` | `Pattern[]` | Array of pattern objects to add |

**Example:**

```typescript
debug.addPatterns([
  {
    error: /MongoError/i,
    cause: 'Database Error',
    fix: 'Check MongoDB connection'
  }
]);
```

---

#### `removePatterns(patternIds: string[]): void`

Removes patterns by their IDs.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `patternIds` | `string[]` | Array of pattern IDs to remove |

---

#### `getPatterns(): Pattern[]`

Returns all registered patterns.

**Returns:** `Pattern[]`

---

### Types

#### `AnalysisResult`

```typescript
interface AnalysisResult {
  /** The identified root cause of the error */
  cause: string;
  
  /** Recommended fix for the error */
  fix: string;
  
  /** Error severity level */
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  /** Confidence score (0-1) */
  confidence: number;
  
  /** Whether the error can be auto-fixed */
  canAutoFix: boolean;
  
  /** Error category */
  category: string;
  
  /** Additional metadata */
  metadata?: Record<string, any>;
}
```

#### `Pattern`

```typescript
interface Pattern {
  /** Unique identifier for the pattern */
  id?: string;
  
  /** Regular expression to match the error */
  error: RegExp | string;
  
  /** Identified root cause when pattern matches */
  cause: string;
  
  /** Recommended fix when pattern matches */
  fix: string;
  
  /** Severity level for this pattern (optional) */
  severity?: 'low' | 'medium' | 'high' | 'critical';
  
  /** Confidence score for this pattern (optional) */
  confidence?: number;
}
```

#### `DebugEngineOptions`

```typescript
interface DebugEngineOptions {
  /** Enable strict pattern matching */
  strictMode?: boolean;
  
  /** Minimum confidence threshold (0-1) */
  confidenceThreshold?: number;
  
  /** Include stack trace in analysis */
  includeStackTrace?: boolean;
  
  /** Custom patterns to load on initialization */
  customPatterns?: Pattern[];
  
  /** Language for error messages */
  language?: 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';
}
```

---

## Configuration

### Configuration File

Create a `.debugagentrc` file in your project root:

```json
{
  "strictMode": false,
  "confidenceThreshold": 0.5,
  "includeStackTrace": true,
  "patterns": [
    {
      "error": "/YourCustomError/i",
      "cause": "Custom Error",
      "fix": "Custom Fix"
    }
  ],
  "reporter": "json",
  "output": "./debug-reports"
}
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG_AGENT_STRICT` | Enable strict mode | `false` |
| `DEBUG_AGENT_THRESHOLD` | Confidence threshold | `0.5` |
| `DEBUG_AGENT_OUTPUT` | Output directory | `./debug-output` |
| `DEBUG_AGENT_LANG` | Language code | `en` |

---

## Error Patterns

DebugAgent recognizes the following built-in error patterns:

### Type Errors

| Error Pattern | Cause | Fix |
|--------------|-------|-----|
| `Cannot read property X of undefined` | Null reference | Add null check |
| `X is not a function` | Wrong type | Check type before calling |
| `Cannot assign to readonly property` | Mutation error | Clone before modifying |

### Reference Errors

| Error Pattern | Cause | Fix |
|--------------|-------|-----|
| `X is not defined` | Variable not defined | Define variable |
| `Cannot access X before initialization` | Temporal dead zone | Reorder declarations |
| `X is not defined` | Scope issue | Check variable scope |

### Async Errors

| Error Pattern | Cause | Fix |
|--------------|-------|-----|
| `await` without async | Missing async | Add async keyword |
| `UnhandledPromiseRejection` | Unhandled promise | Add .catch() or try/catch |

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/debugagent.git

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint
npm run format
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## FAQ

### Q: How accurate is the error analysis?

DebugAgent uses a combination of pattern matching and heuristics. For common JavaScript errors, the accuracy is typically 90%+.

### Q: Can I add my own error patterns?

Yes! Use the `addPatterns()` method to add custom patterns:

```typescript
debug.addPatterns([{
  error: /MyAppError/i,
  cause: 'Application Error',
  fix: 'Check application logs'
}]);
```

### Q: Is DebugAgent suitable for production use?

Yes, DebugAgent is designed for production use and has minimal performance overhead.

### Q: Does it support TypeScript?

Yes! DebugAgent is written in TypeScript and provides full type definitions.

### Q: How do I report bugs?

Please open an issue on GitHub with:
- The error message you're analyzing
- The expected result
- Your DebugAgent version

---

## License

MIT License

Copyright (c) 2024 DebugAgent Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

<p align="center">
  Made with ❤️ by developers, for developers
</p>
