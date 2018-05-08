/**
 * Search List of Objects
 * Returns filtered list where at least one of props contain search query
 * @param {Array} list array of objects to be search
 * @param {Array} props array of object properties to search
 * @param {String} query the phrase to be searched for
 */
const searchObjectList = (list, props, query) => {
  const results = [];
  const n = props.length;
  list.forEach((listItem) => {
    for (let i = 0; i < n; i++) {
      const prop = listItem[props[i]];
      if (typeof prop !== 'object') {
        const text = prop.toString().toLowerCase();
        if (text.includes(query.toLowerCase())) {
          results.push(listItem);
          return;
        }
      }
    }
  });
  return results.slice();
};

export default {
  searchObjectList
};
