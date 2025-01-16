import express from 'express';
import { listImagesInNestedFolders, formatResponse } from '../services/s3Service.js';

const router = express.Router();

router.get('/get-images', async (req, res) => {
  const bucketName = 'flipkartclonenaval';
  const rootFolder = '';

  try {
    const folderStructure = await listImagesInNestedFolders(bucketName, rootFolder);
    const formattedResponse = formatResponse(folderStructure);

    res.json({
      images: formattedResponse,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

export default router;
