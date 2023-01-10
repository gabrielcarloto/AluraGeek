import { ImgurClient } from 'imgur';
import type { ImageData } from 'imgur/lib/common/types';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getENV } from '@utils/env';

const { IMGUR_CLIENT_ID } = getENV('IMGUR_CLIENT_ID');

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse<ImageData>,
) {
  const client = new ImgurClient({ clientId: IMGUR_CLIENT_ID });

  const image: string = req.body;

  const imgurRes = await client.upload({
    image: image.replace(/^data:image\/\w+;base64,/, ''),
    type: 'base64',
  });

  res.json(imgurRes.data);
}
