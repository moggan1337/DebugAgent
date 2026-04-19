export class DebugEngine {
  analyze(error: string): { cause: string; fix: string } {
    const patterns = [
      { error: /undefined/, cause: 'Variable not initialized', fix: 'Add initialization' },
      { error: /null/, cause: 'Null reference', fix: 'Add null check' },
      { error: /async/, cause: 'Missing await', fix: 'Add await keyword' }
    ];
    const match = patterns.find(p => p.error.test(error));
    return match || { cause: 'Unknown error', fix: 'Review stack trace' };
  }
}
export default DebugEngine;
