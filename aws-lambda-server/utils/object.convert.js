// const convertObject = (item) => {
//   const element = {};
//   for (const key in item) {
//     element[key] = item[key][Object.keys(item[key])[0]];
//   }
//   return element;
// };

const convertObject = (item) => {
  let element = {};

  for (let key in item) {
    if (
      typeof item[key] === "object" &&
      item[key] !== null &&
      !Array.isArray(item[key])
    ) {
      if (Object.keys(item[key]).length === 1) {
        element[key] = item[key][Object.keys(item[key])[0]];
      } else {
        element[key] = convertObject(item[key]);
      }
    } else {
      element[key] = item[key];
    }
  }

  return element;
};

module.exports = { convertObject };
