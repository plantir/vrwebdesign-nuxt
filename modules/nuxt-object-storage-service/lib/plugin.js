var Minio = require('minio')

export default (ctx, inject) => {

  var minioClient = new Minio.Client({
    endPoint: process.env.FILE_OBJECT_SERVER_END_POINT,
    port: process.env.FILE_OBJECT_SERVER_PORT,
    useSSL: process.env.FILE_OBJECT_SERVER_USE_SSL,
    accessKey: process.env.FILE_OBJECT_SERVER_ACCESS_KEY,
    secretKey: process.env.FILE_OBJECT_SERVER_SECRET_KEY
  });


  function makeBucket(bucketName, region = '') {
    
    console.log(ctx)
    minioClient.makeBucket(bucketName.toLowerCase(), region || process.env.FILE_OBJECT_SERVER_REGION, function (err) {
      if (err) return console.log(err)

      console.log('Bucket created successfully in ', region)
    });
  }

  function fPutObject(bucketName, filePath, fileName, metaData) {
    minioClient.fPutObject(bucketName, fileName, filePath, metaData, function (err, etag) {
      if (err) return console.log(err)
      console.log('File uploaded successfully.')
    });
  }

  inject('objectStorageService', { makeBucket, fPutObject })
}