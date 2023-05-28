module.exports = (queryObj) => {
  const newQuery = { ...queryObj };
  const excludedFields = ["sort", "fields", "page", "limit"];

  excludedFields.forEach((field) => delete newQuery[field]);
  return newQuery;
};
