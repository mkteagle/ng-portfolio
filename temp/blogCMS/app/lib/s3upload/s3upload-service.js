(function() {
    angular.module('uploaderApp', [])
        .service('S3UploadService', S3UploadService);
        S3UploadService.$inject = ['$q'];

    function S3UploadService ($q) {
            // Us standard region
            AWS.config.region = 'us-west-2';
            AWS.config.update({ accessKeyId: 'AKIAIRV6GSVS5RXFBRPQ', secretAccessKey: '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' });

            var bucket = new AWS.S3({ params: { Bucket: 'doingutahdaily', maxRetries: 10 }, httpOptions: { timeout: 360000 } });

            this.Progress = 0;
            this.Upload = function (file) {
                var deferred = $q.defer();
                var params = { Bucket: 'doingutahdaily', Key: file.name, ContentType: file.type, Body: file };
                var options = {
                    // Part Size of 10mb
                    partSize: 10 * 1024 * 1024,
                    queueSize: 1,
                    // Give the owner of the bucket full control
                    ACL: 'bucket-owner-full-control'
                };
                var uploader = bucket.upload(params, options, function (err, data) {
                    if (err) {
                        deferred.reject(err);
                    }
                    deferred.resolve();
                });
                uploader.on('httpUploadProgress', function (event) {
                    deferred.notify(event);
                });

                return deferred.promise;
            };
        }

})();
