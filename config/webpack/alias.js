const path = require("path");

module.exports = {
  resolve: {
    alias: {
      apis: "src/apis",
      hooks: "src/hooks",
      contexts: "src/contexts",
      common: "src/common",
      components: "src/components",
      neetoui: "@bigbinary/neetoui",
      neetoicons: "@bigbinary/neeto-icons",
      lib: "src/lib",
      utils: "src/utils",
      images: path.resolve(__dirname, "../", "../", "app/assets/images"),
    },
  },
};
