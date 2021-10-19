// ./pages/api/logout
import { NextApiRequest, NextApiResponse } from "next";
import { unsetAuthCookies } from "next-firebase-auth";
import initAuth from "../../logic/initAuth"; // the module you created above

type Data = {
  success: boolean;
};

initAuth();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ success: true });
}
