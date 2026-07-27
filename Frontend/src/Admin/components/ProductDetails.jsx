import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleProduct,
  deleteProduct,
  updateProduct,
} from "../../services/adminCRUD-API";
import "../CSS/productDetail.css"
import toast from "react-hot-toast"

function ProductDetails() {


  const [image, setImage] = useState(null);
  const [isUpdate,setIsUpdate]=useState(false);
  const [isDelete,setIsDelete]=useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    img: null,
  });




  useEffect(() => {
    fetchProduct();
  }, []);


  const fetchProduct = async () => {
    const res = await getSingleProduct(id);
    setProduct(res.data);
  };


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

 const handleUpdate = async () => {
   const formData = new FormData();

   formData.append("title", product.title);
   formData.append("category", product.category);
   formData.append("price", product.price);
   formData.append("stock", product.stock);
   formData.append("description", product.description);

   if (image) {
     formData.append("img", image);
   }

   await updateProduct(id, formData);

   toast.success("Updated Successfully");
   setIsUpdate(false);
   fetchProduct();
 };

  const handleDelete = async () => {
    await deleteProduct(id);
    toast.success("Deleted Successfully");
    navigate("/admin/products");
  };

  const handleEdit=()=>{
    setIsUpdate(true);
  }

  const handleBack=()=>{
    navigate("/admin/Products");
  }

  const handleCancel=()=>{
    setIsUpdate(false);
    setIsDelete(false)
  }
  const DeletePopUp=()=>{
    setIsDelete(true);
  }

  return (
    <>
      {/* delete Pop-up */}
      {isDelete ? (
        <div className="baground-glass">
          <div className="deletePop-up">
            <p>Confirm Delete?</p>
            <div className="del-btn-class">
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="detail-head">
        <h2>Product Detail</h2>
        <div className="detail-btn">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={DeletePopUp}>Delete</button>
        </div>
      </div>

      <div className="product-details">
        <div className="details-img">
          <img src={product.img} alt={product.title} />
        </div>

        <div className="detail-form">
          {isUpdate && (
            <div>
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          )}

          <div>
            <label>Title</label>
            <input
              name="title"
              value={product.title}
              onChange={handleChange}
              disabled={!isUpdate}
            />
          </div>

          <div>
            <label>Category</label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              disabled={!isUpdate}
            />
          </div>

          <div>
            <label>Price</label>
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              disabled={!isUpdate}
            />
          </div>

          <div>
            <label>Stock</label>
            <input
              name="stock"
              value={product.stock}
              onChange={handleChange}
              disabled={!isUpdate}
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              disabled={!isUpdate}
            />
          </div>
          {isUpdate ? (
            <div className="update-detail-btns">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button className="Back" onClick={handleBack}>
              Back
            </button>
          )}
        </div>
       
      </div>
    </>
  );
}

export default ProductDetails;
