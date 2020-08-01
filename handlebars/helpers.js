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
  }
}