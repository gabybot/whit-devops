/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  env: {
    MONGODB_URI: process.env.MONGODB_URI,  // Añade esta línea
  },
};
