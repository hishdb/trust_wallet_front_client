import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: 'Error parsing the files' });
      }

      const formData = new FormData();
      Object.keys(fields).forEach((key) => {
        formData.append(key, (fields as any)[key]);
      });

      if (files.selfie && files.selfie instanceof Array) {
        formData.append('selfie', files.selfie[0].filepath);
      }

      if (files.proofAddress && files.proofAddress instanceof Array) {
        formData.append('proofAddress', files.proofAddress[0].filepath);
      }

      try {
        const response = await axios.post('http://localhost:5000/api/form', formData, {
        });
        res.status(response.status).json(response.data);
      } catch (error: any) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
