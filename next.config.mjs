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
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
  };
};

export default nextConfig;
