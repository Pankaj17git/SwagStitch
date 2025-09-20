const Product = require('../models/product.model.js')

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      quantity: req.body.quantity,
    });

    await product.save();
    console.log("Saved");
    res.status(200).json({
      success: true,
      name: req.body.name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getNewCollections = async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPopularInWomen = async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
}

const updateProductQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product.quantity += quantity;                     
    await product.save();                            

    res.json({ message: `Product with ID ${productId} updated`, updatedQuantity: product.quantity });
  } catch (error) {
   
  }
};


module.exports = {
  addProduct, removeProduct,
  getAllProducts, getNewCollections,
  getPopularInWomen, updateProductQuantity
}