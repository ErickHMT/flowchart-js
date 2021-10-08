import babel from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';
import scss from "rollup-plugin-scss";

export default {
    input: 'src/app.js',
    output: {
        file: 'app/dist/script.js',
        format: 'iife',
        name: 'Flowchart',
        sourcemap: (process.env.NODE_ENV === 'production' ? false : 'inline')
    },
    plugins: [
        resolve(),
        commonjs(),
        eslint({
            fix: true,
            exclude: ['./node_modules/**', './src/app/styles.css']
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
        replace({
            exclude: 'node_modules/**',
            preventAssignment: true,
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && terser())
    ]
}