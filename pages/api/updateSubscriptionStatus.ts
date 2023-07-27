import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    console.log('Request body:', req.body);
    console.log('currentUser:', currentUser);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser?.email ?? '',
      },
      data: {
        isSubscribed:true,
      },
    });
    console.log('Updated user:', updatedUser);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
