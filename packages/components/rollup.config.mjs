import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

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
      postcss({
        extensions: ['.css', '.scss'],
        use: [['sass', {}]],
        extract: 'index.css', // 提取到单文件
        modules: false, // 显式关闭 modules 确保解析普通引入
        // 【核心】配合 preserveModules 使用时，必须让插件在处理后将 scss 的 import 转换为普通的 css 的 import
        // 或者在打包后的 JS 中彻底剥离它。这里我们开启 sourceMap 辅助定位
        sourceMap: true,
        plugins: [autoprefixer()],
        // modules: {
        //   // 自定义生成的类名规则，组件库推荐带有库的前缀，防止与用户样式冲突
        //   generateScopedName: 'my-lib-[name]__[local]___[hash:base64:5]',
        // },
        // use: [
        //   [
        //     'sass',
        //     // {
        //     //   includePaths: [path.resolve(__dirname, 'node_modules')],
        //     // },
        //   ],
        // ],
        // 3. 样式注入方式：
        // extract: 'index.css', // 做法 A: 所有的样式抽离成一个独立的 css 文件 (Element Plus 做法)
        // inject: true, // 做法 B: 样式直接通过 JS 动态注入到 style 标签 (方便用户开箱即用)
      }),
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
    plugins: [
      postcss({
        extensions: ['.css', '.scss'],
        inject: false,
        extract: false,
      }),
      dts(),
    ],
  },
]
