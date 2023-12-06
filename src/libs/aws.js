const AWS = require('aws-sdk');

const credentials = {
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};

AWS.config.update({ credentials, region: process.env.S3_REGION });

const s3 = new AWS.S3();

module.exports = s3;
