/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // WARNING: this will *skip* all ESLint checks during builds
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
