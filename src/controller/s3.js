const s3 = require('../libs/aws.js');
const dotenv = require('dotenv');

dotenv.config();

const getS3Params = (fileName) => ({
	Bucket: process.env.S3_BUCKET_NAME,
	Key: fileName,
	Expires: 100,
});

exports.getPresignedUrl = (req, res) => {
	const { fileName, fileType } = req.query;

	const s3Params = { ...getS3Params(fileName), ContentType: fileType };

	s3.getSignedUrl('putObject', s3Params, (error, presignedUrl) => {
		if (error) {
			res.status(500).send('Error generating the pre-signed URL');
			return;
		}

		res.json({ presignedUrl });
	});
};

exports.getDownloadPresignedUrl = (req, res) => {
	const { fileName } = req.query;

	const s3Params = getS3Params(fileName);

	s3.getSignedUrl('getObject', s3Params, (error, presignedUrl) => {
		if (error) {
			res.status(500).send('Error generating the pre-signed URL');
			return;
		}
		res.json({ presignedUrl });
	});
};
