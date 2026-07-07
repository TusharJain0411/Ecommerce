const Inventory=require("../models/inventory");

exports.getProducts = async (req, res) => {
  const inventory = await Inventory.find(); 
  res.json(inventory );
};

exports.setAddProduct = async (req, res) => {
  try {
    const { title, category, price, stock, description } = req.body;

    const product = await Inventory.create({
      img: req.file.path,  
      title,
      category,
      price,
      description,
      stock,
    });

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.viewProduct = async (req, res) => {
  const product = await Inventory.findById({_id:req.params.id});
  res.send(product);

};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const delete_Prodcut=await Inventory.findByIdAndDelete(id);
  res.json({delete_Prodcut});
};


exports.saleProduct = async (req, res) => {
  const product = await Inventory.findById(req.params.id);
  let newStock;
  if (product.stock > 0) {
    newStock=await Inventory.findByIdAndUpdate(req.params.id, {
      $inc: { stock: -1 },
    });
  }
 res.json({newStock});
};


exports.editProduct = async (req, res) => {
 const product = await Inventory.findById(req.params.id);
  res.json({ product });
};

exports.setEditProduct = async (req, res) => {
  try {
    const { title, category, price, stock, description } = req.body;

    const updateData = {
      title,
      category,
      price,
      stock,
      description,
    };


    if (req.file) {
      updateData.img = req.file.path;
    }

    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.dashboard = async (req, res) => {
  const inventory = await Inventory.find();

  const productCount = inventory.length;

  const stockCount = inventory.reduce((total, item) => {
    return total + item.stock;
  }, 0);

  const AvailableProducts = inventory.filter((item) => item.stock > 0).length;

  const OutOfStockProducts = inventory.filter(
    (item) => item.stock === 0,
  ).length;

  res.json( {
    productCount,
    stockCount,
    AvailableProducts,
    OutOfStockProducts,
  });
};


