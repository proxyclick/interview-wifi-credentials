export default {
  cache: {},

  has: function(key: string) {
    return key in this.cache
  },

  get: function(key: string) {
    if (this.has(key)) {
      return this.cache[key];
    }

    return {};
  },

  set: function(key: string, value: any) {
    this.cache[key] = value;
  }
}
