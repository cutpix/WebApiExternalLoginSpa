# WebApiExternalLoginSpa
Demo Web API 2 With SPA Authenticating Externally (Facebook, Google, etc)

The intent was to do something similar to these instructions on SO http://stackoverflow.com/questions/21065648/asp-net-web-api-2-how-to-login-with-external-authentication-services and http://stackoverflow.com/questions/31714500/access-email-address-in-the-oauth-externallogincallback-from-facebook-v2-4-api-i

# Facebook Configuration
I have the site URL set to http://localhost:2999/FacebookCallback. I'm opening a window using target=blank and then using window.opener to set the route from the child window after the callback as kind of a hack because I hate the redirect.

# TODOs
Couch DB demo...
Google authentication
Ionic2 version

