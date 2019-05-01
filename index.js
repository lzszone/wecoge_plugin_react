const installReact = async (i, id, getPackages, getDeps) => {
  const devDeps = ['@babel/preset-react', '@babel/preset-env'];
  const deps = ['react'];
  const { dependencies } = await getDeps();
  if(dependencies.find(elm => elm === 'typescript')) {
    devDeps.push('@types/react');
  }
  return i(deps)
    .then(() => id(devDeps))
}

const pkg = {
  config: {
    entry: './src/index.ts',
    output: {
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', 
                '@babel/preset-react'
              ],
            }
          }
        },
      ]
    },
  },
  executor: installReact
}

export default pkg;