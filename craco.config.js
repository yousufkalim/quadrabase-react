module.exports = {
  style: {
    postOptions: {
      plugins: [
        require("tailwindcss")("./src/css/tailwind.config.js"),
        require("autoprefixer"),
      ],
    },
  },
};
