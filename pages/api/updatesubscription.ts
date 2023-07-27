// import { NextApiRequest, NextApiResponse } from 'next';
// import serverAuth, { CurrentUser } from '@/libs/serverAuth'
// import prismadb from '@/libs/prismadb';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // Make sure the request is coming from an authenticated user
//     const currentUser: CurrentUser = await serverAuth(req, res);

//     if (req.method !== 'POST') {
//       return res.status(405).end();
//     }

//     const isSubscribedString = 'true';

//     await prismadb.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: {
//         isSubscribed: isSubscribedString,
//       },
//     });

//     return res.status(200).json({ message: 'Subscription updated successfully' });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).end();
//   }
// };

// export default handler;
