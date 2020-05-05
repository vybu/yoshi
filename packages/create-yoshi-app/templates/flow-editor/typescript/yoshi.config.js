const { editorUrl, viewerUrl } = require('./dev/sites');

module.exports = {
  startUrl: [editorUrl, viewerUrl].filter(Boolean),
  servers: {
    cdn: {
      ssl: true,
    },
  },
};
