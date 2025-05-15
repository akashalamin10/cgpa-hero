const express = require('express');
const axios = require('axios');
const app = express();

// Proxy middleware
app.get('*', async (req, res) => {
  const targetUrl = 'http://v1-cgpa-hero-diu.surge.sh' + req.path;
  
  try {
    const response = await axios.get(targetUrl, {
      proxy: {
        host: '103.81.175.218',
        port: 28022,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(`Proxy Error: ${error.message}`);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));