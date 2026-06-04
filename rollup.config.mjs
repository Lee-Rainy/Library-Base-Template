import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import { fileURLToPath } from 'url'
import alias from '@rollup/plugin-alias'

const isProd = process.env.NODE_ENV === 'production'

const input = 'packages/core/src/index.ts'

const outputDir = 'dist'

const extensions = ['.js', '.ts', '.tsx']

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 公共插件
 */
const basePlugins = [
  peerDepsExternal(), // 自动 external peerDependencies
  resolve({ extensions }),
  commonjs(),
  alias({
    entries: [
      {
        find: '@ui',
        replacement: path.resolve(__dirname, 'packages'),
      },
    ],
  }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
  }),
  postcss({
    extract: true, // 抽离 css
    minimize: isProd,
    sourceMap: true,
    use: ['sass'],
  }),
  ts({
    tsconfig: path.resolve(__dirname, 'tsconfig.base.json'),
    useTsconfigDeclarationDir: true,
    clean: true,
  }),
]

/**
 * JS 构建
 */
const buildConfig = {
  input,
  output: [
    {
      file: `${outputDir}/index.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: `${outputDir}/index.cjs.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [...basePlugins, isProd && terser()],
}

/**
 * 类型构建
 */
const dtsConfig = {
  input,
  output: {
    file: `${outputDir}/index.d.ts`,
    format: 'es',
  },
  plugins: [dts()],
  external: [/\.scss$/, /\.css$/],
}

export default [buildConfig, dtsConfig]
