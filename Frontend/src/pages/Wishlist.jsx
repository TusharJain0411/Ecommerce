import React ,{useEffect, useState} from 'react'

import { useDispatch, useSelector } from "react-redux";

import { setWishlist,clearWishlist } from '../redux/slices/wishlistSlice';

import { removeWishlist,getWishlist } from '../services/wishlistAPI';

function Wishlist() {

 const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const validItems = items.filter((item) => item.productId);



const handleRemoveFromWishlist = async (id) => {
  try{

    const res = await removeWishlist(id);
    dispatch(setWishlist(res.data.wishlist));
  }
  catch(err){
    console.log("wishlist is not removing",err);
  }
  finally{
  
  }
};

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await getWishlist();
      dispatch(setWishlist(res.data.wishlist));
    };

    fetchWishlist();
  }, [dispatch]);


  return (
    <>
      <div className="container-wishlist  ">
        <h2 style={{ fontSize: "2.5rem", fontWeight: "600" }}>Wishlist</h2>

        <div className="wishlist-container ">
          {validItems.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center">
              <span style={{ fontSize: "3rem", color: "red" }}>
                Wishlist is Empty
              </span>
              <i
                className="fa-solid fa-heart-circle-xmark fa-beat"
                style={{
                  fontSize: "3rem",
                  color: " rgb(239, 137, 137)",
                  marginLeft: "0.5rem",
                }}
              ></i>
            </div>
          ) : (
            items
              .filter((item) => item.productId)
              .map((item) => (
                <div key={item._id} className="wishlist-item   shadow ">
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded"
                      src={item.productId.img}
                      alt={item.productId.title}
                      width="100"
                      height="120"
                      style={{ objectFit: "cover" }}
                    />

                    <div className="ms-3">
                      <h5>{item.productId.title}</h5>
                      <p>₹{item.productId.price}</p>
                      <div className="w-75">{item.description}</div>
                    </div>
                  </div>

                  <div className="actions">
                    <button
                      className=" RemoveWishlist"
                      onClick={() =>
                        handleRemoveFromWishlist(item.productId._id)
                      }
                    >
                      
                    
                        <i class="fa-solid fa-heart-circle-xmark"></i>
                     
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist
