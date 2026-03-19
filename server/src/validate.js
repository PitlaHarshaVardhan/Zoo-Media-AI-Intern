function validateInput(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new Error("Input text must be a non-empty string.");
  }
  return text.trim();
}

module.exports = { validateInput };
