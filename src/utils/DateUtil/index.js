
/**
 * Add Create Date String
 * Adds createDateString property to item or array of items
 * Calculated using items createDate property and locale string
 * @param {*} items
 */
const addCreateDateStrings = (items) => {
  const result = items;
  if (Array.isArray(result)) {
    items.map(item => Object.assign(item, {
      createDateString: new Date(item.createDate).toLocaleString()
    }));
  } else if (typeof result === 'object') {
    result.createDateString = new Date(items.createDate).toLocaleString();
  }
  return result;
};

export default {
  addCreateDateStrings
};
