const express = require('express');
const { formatResponse } = require('./utils');

const app = express();

app.get('/api/status', (req, res) => {
  res.status(200).json(formatResponse({ status: 'healthy' }));
});

// For testing purposes, we export the app without listening on a port
// In production/local start, we'd wrap this or listen in a server.js file
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
