import { execSync } from 'node:child_process'

const packages = ['@library/utils', '@library/hooks', '@library/components']

for (const pkg of packages) {
  console.log(`\n🚀 building ${pkg}...\n`)

  execSync(`pnpm --filter ${pkg} build`, {
    stdio: 'inherit',
  })
}

console.log('\n✅ build complete\n')
