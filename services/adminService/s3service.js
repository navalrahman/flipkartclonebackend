// import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import s3 from '../../config/aws.js'

export const uploadToS3 = async (file, category) => {
    
    const fileKey = `${category}/${uuidv4()}-${file.originalname}`; // File path in S3

    const params = {
        Bucket: 'flipkartclonenaval',
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        // console.log('Uploading to S3 with params:', params);
        const uploadResult = await s3.upload(params).promise();
        // console.log('Upload result:', uploadResult);
        return uploadResult.Location;
    } catch (error) {
        console.error('Error details:', error);
        throw new Error('Error uploading to S3: ' + error.message);
    }
};
