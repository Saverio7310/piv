// babel.config.js
module.exports = {
  presets: [
    // Use @babel/preset-env to transpile modern JS features and import/export
    ['@babel/preset-env', {
      targets: {
        node: 'current', // Compile code for the version of Node.js you are currently using
      },
    }],
    // If your test files or the code they import use JSX or React syntax,
    // you would also need to add the React preset:
    // '@babel/preset-react',
  ],
  plugins: [
      // Include any necessary plugins that your code might use (e.g., from your CRA setup)
      // The plugin below is in your devDependencies, include it if the code you test needs it:
      // "@babel/plugin-proposal-private-property-in-object"
  ]
};