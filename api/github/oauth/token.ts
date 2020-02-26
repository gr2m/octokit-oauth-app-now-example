import { NowRequest, NowResponse } from "@now/node";
import { createToken, checkToken } from "@octokit/oauth-app";

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method === "POST") {
    const { token, scopes } = await createToken({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      state: req.body.state as string,
      code: req.body.code as string
    });

    return res.json({ token, scopes });
  }

  if (req.method === "GET") {
    const token = req.headers.authorization?.substr("token ".length);

    if (!token) {
      res.status(400);
      return res.json({
        error: '[@octokit/oauth-app] "Authorization" header is required'
      });
    }

    const result = await checkToken({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      token
    });

    res.status(200);
    return res.json(result);
  }

  throw new Error(`${req.method} not supported`);
};
