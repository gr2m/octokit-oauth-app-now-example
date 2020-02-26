import { NowRequest, NowResponse } from "@now/node";
import { createToken } from "@octokit/oauth-app";

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

  throw new Error(`${req.method} not supported`);
};
