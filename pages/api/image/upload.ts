import aws from "aws-sdk";

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // accessKeyId that is stored in .env file
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET, // secretAccessKey is also store in .env file
});

export default (data: Buffer, filename: string) =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: "qtma-2022-team-4", // S3 bucket
      Key: filename, // Name of the image
      Body: data, // Body which will contain the image in buffer format
      ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
    };

    // upload the photo to s3
    s3.upload(params, (error: Error, dataS3: any) => {
      if (error) {
        reject(error); // return error message
      }
      resolve(dataS3); // otherwise return the data
    });
  });
