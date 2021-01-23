module.exports = {
  section(name, options) {
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  },
  json(content) {
    return JSON.stringify(content);
  },
  or(...args) {
    return args.slice(0, -1).some(Boolean);
  },
  ifEquals(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
  ifOdd(conditional, options) {
    return (conditional % 2 !== 0) ? options.fn(this) : options.inverse(this);
  }
}