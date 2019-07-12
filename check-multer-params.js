module.exports = input => {
  let filePath;
  let filename;
  let storage = [];

  switch (Array.isArray(input)) {
    case true:
      input.forEach(element => {
        filePath = element.path;
        filename = element.originalname;
        storage.push({ filePath, filename });
      });
      break;

    case false:
      if (typeof input === 'object' && Object.keys(input).length) {
        Object.values(input).forEach(element => {
          filePath = element[0].path;
          filename = element[0].originalname;
          storage = { filePath, filename };
        });
      }
      break;

    default:
      break;
  }

  return storage;
};
