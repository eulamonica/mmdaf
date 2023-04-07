import { verifyToken } from "@/lib/auth";

/*
- if logged in
+ allowed-login: Show me dashboard, and any private pages
+ banned-login: redirect me to dashboard if i go to auth pages
+ not-verified-login: if the email is not verified then redirect me to profile pages

- if logged out
+ public-pages: show me dashboard and any public pages
+ private-pages: redirect me to dashboard when i go to private
*/

function checkAuth(req) {

  const token = req.cookies.token;
  if (!token) return { isLoggedIn: false };

  const decodedToken = verifyToken(token);
  if (!decodedToken) return { isLoggedIn: false };

  return { isLoggedIn: true, isEmailVerified: decodedToken.isEmailVerified, user: decodedToken }
}

const withAuth = (handler, allowed = false, publicPage = true) => async (req, res) => {
  const authResult = checkAuth(req);

  const isLoggedIn = authResult.isLoggedIn

  const dahsboardDestination = '/views/public/dashboard'
  const profileDestinaion = '/views/private/profile'

  // if not logged in and going to public pages
  if (!isLoggedIn && publicPage && allowed == true)
    return handler({ user: authResult.user });


  // if not logged in and going to private pages
  if (!isLoggedIn && !publicPage && !req.url.startsWith(dahsboardDestination)) {
    return {
      redirect: {
        destination: dahsboardDestination,
        permanent: false,
      }
    }
  }

  // if logged in and going to private page and email not verified 
  if (isLoggedIn && !publicPage && !authResult.isEmailVerified && !allowed && !req.url.startsWith(profileDestinaion)) {
    return {
      redirect: {
        destination: profileDestinaion,
        permanent: false,
      }
    }
  }

  // if logged in and the page is public and not allowed
  // auth pages like login and register
  if (isLoggedIn && publicPage && !allowed && !req.url.startsWith(dahsboardDestination)) {
    return {
      redirect: {
        destination: dahsboardDestination,
        permanent: false,
      }
    }
  }

  // if logged in and the page is public and allowed which means not affected if it's logged in or not
  // Dashboard
  if (isLoggedIn && publicPage && allowed)
    return handler({ user: authResult.user });

  return handler({ user: authResult.user });

}

export default withAuth;


