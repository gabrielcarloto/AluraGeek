import { ImgurClient } from 'imgur';
import type { ImageData } from 'imgur/lib/common/types';
import type { NextApiRequest, NextApiResponse } from 'next';

import { adminAction } from '@utils/admin';
import { getENV } from '@utils/env';
import { allowedHttpMethods, STATUS } from '@utils/http';

const { IMGUR_CLIENT_ID } = getENV('IMGUR_CLIENT_ID');

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse<ImageData | { error: string }>,
) {
  if (req.method !== 'POST') {
    return allowedHttpMethods(res, 'POST');
  }

  return adminAction(req, res, async () => {
    try {
      const client = new ImgurClient({ clientId: IMGUR_CLIENT_ID });

      const image: string = req.body;

      const imgurRes = await client.upload({
        image: image.replace(/^data:image\/\w+;base64,/, ''),
        type: 'base64',
      });

      return res.status(STATUS.OK).json(imgurRes.data);
    } catch (err) {
      if (err instanceof Error) console.error(`Couldn't upload image: ${err.message}`);

      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        error: 'Could not upload image',
      });
    }
  });
}
