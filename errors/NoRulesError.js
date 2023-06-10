class NoRulesError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoRulesError';
    this.statusCode = 409;
  }
}

module.exports = NoRulesError;
