const mongodb = require("mongodb")
const getDb = require("../util/database").getDb

const ObjectId = mongodb.ObjectId

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    // console.log(id);
    this._id = id ? new ObjectId(id) : undefined
  }

  save() {
    const db = getDb()
    let dbOp

    // console.log("idid:" + this._id);
    if (this._id) {
      // update existing product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
    } else {
      // console.log("here");
      // insert new product
      dbOp = db.collection("products").insertOne(this)
    }
    return dbOp
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log(err))
  }

  static fetchAll() {
    const db = getDb()
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products
      })
      .catch((err) => console.log(err))
  }

  static findById(prodId) {
    const db = getDb()
    return db
      .collection("products")
      .find({ _id: new ObjectId(prodId) })
      .next()
      .then((product) => {
        // console.log(product);
        return product
      })
  }

  static deleteById(prodId) {
    const db = getDb()
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(prodId) })
      .then((result) => console.log("deleted"))
      .catch((err) => console.log(err))
  }
}

module.exports = Product
