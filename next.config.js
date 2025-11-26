const nextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {},
  experimental: {
    // Reduce Next.js static generation concurrency for constrained build environments
    workerThreads: false,
    cpus: 1,
  },
};

module.exports = nextConfig;
