module.exports = {
  plugins: [
    ['module-resolver', {
      root: ['./'],
      alias: {
        '@': './',
        actions: './src/store/actions',
        components: './src/components/',
        reducers: './src/store/reducers/',
      },
    }],
  ],
};
