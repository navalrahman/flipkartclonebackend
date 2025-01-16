import s3 from '../config/aws.js';

// Function to list images in nested folders
export const listImagesInNestedFolders = async (bucketName, prefix = '') => {
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
    ).map((file) => `https://${bucketName}.s3.${s3.config.region}.amazonaws.com/${file.Key}`);

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

// Format the response to flatten the structure
export const formatResponse = (result) => {
  return [
    ...(result.files.length ? [{ subfolder: result.folder, files: result.files }] : []),
    ...(result.subfolders.flat().map((subfolder) => ({
      subfolder: subfolder.subfolder,
      files: subfolder.files,
    }))),
  ];
};
