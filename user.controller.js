const Users = require('./user.schema');
const uploadToS3 = require('./upload-to-s3');

module.exports = {
  signup(req, res) {
    let userRequestObject = req.body;

    // The actual create user operation abstracted to be used in the different possible scenarios
    const createUser = () =>
      Users.create(userRequestObject).then(user => {
        return res
          .status(201)
          .json({ message: 'user created successfully', user });
      });

    if (req.files) {
      if ('avatar' in req.files && 'galleryPhoto' in req.files) {
        Promise.all([
          uploadToS3({
            file: req.files.avatar,
            folderName: 'avatars'
          }),
          uploadToS3({
            file: req.files.galleryPhoto,
            folderName: 'galleryPhotos'
          })
        ]).then(response => {
          userRequestObject.avatar = response[0][0];
          userRequestObject.galleryPhoto = response[1][0];
          createUser();
        });
      }

      if ('avatar' in req.files && !('galleryPhoto' in req.files)) {
        uploadToS3({
          file: req.files.avatar,
          folderName: 'avatars'
        }).then(response => {
          userRequestObject.avatar = response[0];
          createUser();
        });
      }

      if ('galleryPhoto' in req.files && !('avatar' in req.files)) {
        uploadToS3({
          file: req.files.galleryPhoto,
          folderName: 'galleryPhotos'
        }).then(response => {
          userRequestObject.galleryPhoto = response[0];
          createUser();
        });
      }
    } else {
      createUser();
    }
  }
};
