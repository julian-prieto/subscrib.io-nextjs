const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    styledComponents: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
