import { request as defaultRequest } from "https://cdn.pika.dev/@octokit/request";
const searchParams = new URLSearchParams(location.search);

const params = {};
for (const [key, value] of searchParams.entries()) {
  params[key] = value;
}

if (params.code) {
  exchangeCodeForToken(params.code);
} else {
  setup();
}

async function setup() {
  const token = localStorage.getItem("token");
  if (!token) return logout();

  // we asume the token is valid
  login(token);
  window.request = defaultRequest.defaults({
    headers: {
      authorization: `token ${token}`
    }
  });

  // ... but we check just to be sure
  request(`GET ${location.origin}/api/github/oauth/token`).catch(logout);
}
async function exchangeCodeForToken(code) {
  const response = await defaultRequest(
    `POST ${location.origin}/api/github/oauth/token`,
    {
      code: params.code
    }
  ).catch(console.error);

  if (!response) return;

  console.log(
    "access token is %s. Enabled scopes: ",
    response.data.token,
    response.data.scopes.join(", ")
  );
  login(response.data.token);
  window.request = defaultRequest.defaults({
    headers: {
      authorization: `token ${response.data.token}`
    }
  });

  // remove ?code=... and &state=... from URL
  const path =
    location.pathname +
    location.search.replace(/\b(code|state)=\w+/g, "").replace(/[?&]+$/, "");

  history.pushState({}, "", path);
}

function login(token) {
  document.body.dataset.state = "main";
  localStorage.setItem("token", token);
}

async function logout(options = {}) {
  if (options.invalidateToken) {
    await request(`DELETE ${location.origin}/api/github/oauth/token`);
  }

  document.body.dataset.state = "login";
  localStorage.clear();
}

async function sayMyName() {
  const { data } = await request("GET /user");
  alert(data.name);
}

window.logout = logout;
window.sayMyName = sayMyName;
