module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'EsriGeocoder',
      externals: {
        react: 'React'
      }
    }
  }
}
