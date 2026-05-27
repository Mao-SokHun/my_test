// ============= Start api response helpers =============
// ................................................

// Start success response
// ................................................
function ok(response, data, status = 200) {
  return response.status(status).json({ success: true, data });
}
// End success response
// ................................................

// Start error response
// ................................................
function fail(response, message, status = 400) {
  return response.status(status).json({ success: false, error: message });
}
// End error response
// ................................................

module.exports = { ok, fail };

// ============= End api response helpers =============
