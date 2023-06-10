class NoRulesError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoRulesError';
    this.statusCode = 401;
  }
}

module.exports = NoRulesError;