const module = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [
      [
        "import",
        {libraryName: "ant-design-vue", libraryDirectory: "es", style: true}
      ],
    ],
    env: {
      test: {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
      }
    }
};

export default module