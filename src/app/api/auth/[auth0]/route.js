// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        // Set your custom callback URL here
        returnTo: '/welcome',
      });
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).end(error.message);
    }
  },
});
