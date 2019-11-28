module.exports = {
  extends: "airbnb",
  env: {
    node: true
  },
  rules: {
    "no-console": "off",
    "no-await-in-loop": "off",
    "no-param-reassign": ["warn", { "props": false }],
    "max-len": ["error", { "code": 120 }]
  }
};