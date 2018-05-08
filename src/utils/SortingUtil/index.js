const sortBy = {

  date: (list, sortKey, reverse) => list.sort((a, b) => {
    const result = new Date(a[sortKey]) - new Date(b[sortKey]);
    return (reverse) ? (result * -1) : result;
  }),

  string: (list, sortKey, reverse) => list.sort((a, b) => {
    const result = (a[sortKey] < b[sortKey]) ? -1 : 1;
    return (reverse) ? (result * -1) : result;
  }),

  number: (list, sortKey, reverse) => list.sort((a, b) => {
    const result = Number(a[sortKey]) - Number(b[sortKey]);
    return (reverse) ? (result * -1) : result;
  }),

  arrayLength: (list, sortKey, reverse) => list.sort((a, b) => {
    const result = a[sortKey].length - b[sortKey].length;
    return (reverse) ? (result * -1) : result;
  })

};


const sortData = (list, sortKey, sortType, reverse) => {
  if (!Array.isArray || !list.length) {
    return undefined;
  }
  return sortBy[sortType](list, sortKey, reverse);
};


export default {
  sortData
};
