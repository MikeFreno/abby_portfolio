/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abbyportfolio.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
