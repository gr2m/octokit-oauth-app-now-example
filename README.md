# `@octokit/oauth-app` serverless example

This example showcases how to create an OAuth Client server for GitHub's (OAuth) Apps for a serverless environment using [now](https://zeit.co/home)

All the [default routes](https://github.com/octokit/oauth-app.js#middlewares) are implemented using separate files in the `/api` folder

Learn more about [`@octokit/oauth-app`](https://github.com/octokit/oauth-app.js#readme).

## Setup

Create two OAuth GitHub Apps, one for production and one for local development:
https://github.com/settings/applications/new

The one for production needs to set `Authorization callback URL` to your apps URL: `https://<your app name>.now.sh/api/github/oauth/login`. Then one for local development needs to set it to `http://localhost:3000/api/github/oauth/callback`

Set the `octokit-oauth-app-client-id` and `octokit-oauth-app-client-secret` secrets using the `now` CLI

```sh
now secrets add octokit-oauth-app-client-id <Client ID>
now secrets add octokit-oauth-app-client-secret <Client Secret>
```

Then create an `.env` file and put in the Client ID & Secret for your

## License

[ISC](LICENSE)
