const filterQuery = require("./filterQuery");

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Implementing filtering
  filter() {
    const queryObj = filterQuery(this.queryString);
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Implementing sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("price");
    }

    return this;
  }

  // Implementing field limiting
  limitFields() {
    if (this.queryString.fields) {
      const fieldBy = this.queryString.fields.split(",").join(" ");

      this.query = this.query.select(fieldBy);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // Implementing pagination
  pagination() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 30;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
