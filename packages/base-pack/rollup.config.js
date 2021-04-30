require('dotenv').config({ path: __dirname + "/./../../.env" })
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: "src/index.ts",
  output: {
    format: "es",
    file: "dist/index.js",
  },
  plugins: [
    replace({
        preventAssignment: true,
        'process.env.VIEWER_TRANSITION_SPEED': process.env.VIEWER_TRANSITION_SPEED,
    }),
    typescript()
  ],
};
