import React,{useState} from 'react'
import "../CSS/addproduct.css"
import { addProductAPI } from '../../services/adminCRUD-API'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function AddProduct() {
    const navigate=useNavigate();
    const [ProductData,setProductData]=useState({
        img:"",
        title:"",
        category:"",
        price:"",
        description:"",
        stock:""
    })

    const handleChange = (e) => {
      if (e.target.name === "img") {
        setProductData({
          ...ProductData,
          img: e.target.files[0], // Store the File object
        });
      } else {
        setProductData({
          ...ProductData,
          [e.target.name]: e.target.value,
        });
      }
    };

 const handleSubmitProduct = async (e) => {
   e.preventDefault();

   try {
     const formData = new FormData();

     formData.append("img", ProductData.img);
     formData.append("title", ProductData.title);
     formData.append("category", ProductData.category);
     formData.append("price", ProductData.price);
     formData.append("description", ProductData.description);
     formData.append("stock", ProductData.stock);

     const res = await addProductAPI(formData);

     toast.success("Product added successfully!");

     setProductData({
       img: null,
       title: "",
       category: "",
       price: "",
       description: "",
       stock: "",
     });

     navigate("/admin/Products");
   } catch (err) {
     console.log(err);
   }
 };

    const handleBack=()=>{
      navigate("/admin/Products");
    }

  return (
    <>
      <form className="addproduct border w-100">
        <h2 className="addproduct-head">Add Product</h2>

        <input
          type="file"
          accept="image/*"
          name="img"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Category"
          name="category"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Price"
          name="price"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Stock"
          name="stock"
          onChange={handleChange}
        />

        <div className="button-action d-flex justify-content-center align-items-center gap-2 flex-row ">
          <button onClick={handleSubmitProduct} className="AddProduct">
            Add Product
          </button>
          <Link to="/admin/Products">Back</Link>
        </div>
      </form>
    </>
  );
}

export default AddProduct
