import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

const input = './src/index.ts'
const isProd = process.env.NODE_ENV === 'production'
export default [
  /**
   * js build
   */
  {
    input,
    external: ['react', 'react-dom'],
    output: [
      {
        dir: './dist/es',
        format: 'esm',
        entryFileNames: '[name].js',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        dir: './dist/cjs',
        format: 'cjs',
        entryFileNames: '[name].js',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      isProd &&
        terser({
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          format: {
            comments: false,
          },
        }),
    ].filter(Boolean),
  },

  /**
   * dts build
   */
  {
    input,
    output: [
      {
        file: './dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
]
