/** @type {import('next').NextConfig} */
// https://lh3.googleusercontent.com/a/ACg8ocKFvWFg4bqUf0PBS-s6apjyIjp358EJ6KbyYKc9YZsSsTRm=s96-c

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/a/**',
        },
      ],
    },
  }
