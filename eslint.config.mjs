import { neostandard } from 'neostandard'

// ESLint flat config with TypeScript parsing and rules. Tests import Vitest's
// API explicitly, so no additional test globals need to be declared here.
export default neostandard({
  ts: true,
})
