/**
 * Formats data into a standard API response structure
 * @param {Object} data - The data payload to format
 * @returns {Object} The formatted response containing success, data, and timestamp
 */
function formatResponse(data) {
  return {
    success: true,
    data: data,
    timestamp: new Date().toISOString()
  };
}

module.exports = { formatResponse };
