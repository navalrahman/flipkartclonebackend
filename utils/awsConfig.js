import AWS from '../config/aws.js';


  const s3 = new AWS.S3();

// List images in nested folders
const listImagesInNestedFolders = async (bucketName, prefix = '') => {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
    Delimiter: '/',
  };

  try {
    const data = await s3.listObjectsV2(params).promise();

    const folders = data.CommonPrefixes?.map((prefixObj) => prefixObj.Prefix) || [];
    const fileUrls = data.Contents.filter(
      (content) =>
        content.Key !== prefix &&
        (content.Key.endsWith('.jpg') || content.Key.endsWith('.png') || content.Key.endsWith('.jpeg'))
    ).map((file) => `https://${bucketName}.s3.${AWS.config.region}.amazonaws.com/${file.Key}`);

    const nestedFolders = await Promise.all(
      folders.map(async (folder) => ({
        subfolder: folder,
        files: (await listImagesInNestedFolders(bucketName, folder)).files,
      }))
    );

    return {
      files: fileUrls,
      subfolders: nestedFolders,
    };
  } catch (error) {
    console.error(`Error fetching files for prefix "${prefix}":`, error);
    throw error;
  }
};


export {
    listImagesInNestedFolders
}