/** @type {import('next').NextConfig} */

const nextConfig = async () => {
  return {
    experimental:{
      outputFileTracingIncludes: {
        '/slice-library': ['./slices/**/*']
      }
    },
    reactStrictMode: true,
    images: {
      loader: "imgix",
      path: "https://images.prismic.io/",
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/slice-library',
          permanent: true,
        },
      ]
    },
  };
};

export default nextConfig;
