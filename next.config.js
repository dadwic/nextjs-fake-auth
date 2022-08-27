module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/panel",
        permanent: true,
      },
    ];
  },
};
