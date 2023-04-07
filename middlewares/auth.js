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

async function checkAuth() {

  const token = req.cookies.token;
  if (!token) return { isLoggedIn: false };

  const decodedToken = verifyToken(token);
  if (!decodedToken) return { isLoggedIn: false };

  return { isLoggedIn: true, isEmailVerified: token.isEmailVerified, user: token }
}

const withAuth = async (handler, allowed = false, privatePage = false) => async (req) => {
  const authResult = await checkAuth(req);

  const isLoggedIn = authResult.isLoggedIn

  // if not logged in and going to public pages
  if (!isLoggedIn && privatePage === false)
    return handler({ user: authResult.user });


  // if not logged in and going to private pages
  if (!isLoggedIn && privatePage === true) {
    return {
      redirect: {
        destination: '/views/public/dashboard/',
        permanent: false,
      }
    }
  }

  // if logged in and going to private page and email not verified 
  if (isLoggedIn && privatePage === true && !authResult.isEmailVerified) {
    return {
      redirect: {
        destination: '/views/private/profile/',
        permanent: false,
      }
    }
  }

  // if logged in and the page is public and not allowed
  // auth pages like login and register
  if (isLoggedIn && privatePage === false && allowed === false) {
    return {
      redirect: {
        destination: '/views/public/dashboard/',
        permanent: false,
      }
    }
  }

  // if logged in and the page is public and allowed which means not affected if it's logged in or not
  // Dashboard
  if (isLoggedIn && privatePage === false && allowed)
    return handler({ user: authResult.user });


  // if logged in and private page 
  if (isLoggedIn && privatePage) {
    return {
      redirect: {
        destination: '/views/public/dashboard/',
        permanent: false,
      }
    }
  }

  return handler({ user: authResult.user });

}

//

// const withAuth = (handler, redirectIfNotAuth = true, redirectTo = null) => async (req) => {
//   const authResult = checkAuth(req);

//   if (!authResult.isAuth && redirectIfNotAuth) {
//     return {
//       redirect: {
//         destination: '/views/public/dashboard/',
//         permanent: false,
//       },
//     };
//   }
//   if (authResult.isAuth && redirectTo) {
//     return {
//       redirect: {
//         destination: redirectTo,
//         permanent: false,
//       },
//     };
//   }

//   return handler({ user: authResult.user });
// }

// export default withAuth;
// export { checkAuth };

