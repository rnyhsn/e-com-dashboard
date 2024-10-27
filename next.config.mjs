/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
        ],
      },
    env: {
      MONGO_URL: process.env.MONGO_URL
    }
};

export default nextConfig;
