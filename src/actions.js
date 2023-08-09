import { toast } from "react-toastify";
import { mainSliceActions } from "./Store/MainSlice";

export const proxy = process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_PROXY}/api/v1` : '/api/v1';

// TOken Verification
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// -----------------User Actions-------------------

// SignUp
export const signupSubmit = async (userData, navigate) => {
  const formData = new FormData();
  formData.append("name", userData.name);
  formData.append("username", userData.username);
  formData.append("password", userData.password);
  formData.append("email", userData.email);
  if (userData.profileImage)
    formData.append("profileImage", userData.profileImage);

  try {
    const response = await fetch(`${proxy}/register`, {
      method: "POST",
      body: formData,
    });

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success("Registration Successful - Please Login");
      setTimeout(() => {
        navigate("/login", { replace: true });
        toast.info("Please Login");
      }, 1500);
    }
  } catch (error) {
    toast.error(error);
    console.error("Error:", error);
  }
};

// Login
export const loginSubmit = async (loginData, navigate, dispatch) => {
  const formData = new FormData();
  formData.append("username", loginData.username);
  formData.append("password", loginData.password);

  try {
    const response = await fetch(`${proxy}/login`, {
      method: "POST",
      body: formData,
    });

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      localStorage.setItem("token", resResult?.token);
      dispatch(mainSliceActions.loggedUserData(resResult?.userDetails));
      setTimeout(() => {
        navigate("/");
        toast.success("Login Successful");
      }, 1000);
    }
  } catch (error) {
    toast.error(error);
    console.error("Error:", error);
  }
};

//Forgot Password
export const forgotPasswordSubmit = async (username) => {
  try {
    const formData = new FormData();
    formData.append("username", username.toLowerCase());

    const response = await fetch(`${proxy}/forgot-Password`, {
      method: "POST",
      body: formData,
    });

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult;
    }
  } catch (error) {
    toast.error(error);
    console.error("Error:", error);
  }
};

// Oauth Verification
export const oAuthVerification = async (G_Key, navigate, dispatch) => {
  try {
    const formData = new FormData();
    formData.append("gkey", G_Key);
    const response = await fetch(`${proxy}/user-verification`, {
      method: "POST",
      body: formData,
    });

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      localStorage.setItem("token", resResult?.token);
      dispatch(mainSliceActions.loggedUserData(resResult?.userDetails));
      setTimeout(() => {
        navigate("/");
        toast.success("Login Successful");
      }, 1000);
    }
  } catch (error) {
    toast.error(error);
    console.error("Error:", error);
  }
};

//Forgot Username
export const forgotUsernameSubmit = async (email) => {
  try {
    const formData = new FormData();
    formData.append("email", email.toLowerCase());

    const response = await fetch(`${proxy}/forgot-username`, {
      method: "POST",
      body: formData,
    });

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult;
    }
  } catch (error) {
    toast.error(error);
    console.error("Error:", error);
  }
};

// change Password
export const changePassword = async (data) => {
  try {
    const formData = new FormData();
    formData.append('currentPassword', data.currentPassword)
    formData.append('newPassword', data.newPassword)

    const token = localStorage.getItem('token');
    const response = await fetch(`${proxy}/change-password`, {
      method: "PUT",
      headers: { 'authorization': `token ${token}` },
      body: formData,
    });

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Password Changed Successfully')
      return resResult;
    }
  } catch (error) {
    toast.error(error);
    console.error("Error:", error);
  }
}


// Product Functions

// Create Product
export const createProduct = async (productData, setShowConfirmationModal, navigate, userData) => {
  try {
    const productInfo = productData.props

    const formData = new FormData();
    formData.append('productName', productInfo.productName)
    formData.append('description', productInfo.description)
    formData.append('discount', productInfo.discount)
    productInfo.images.map(image => formData.append('images', image))
    formData.append('manufacturer', productInfo.manufacturer)
    formData.append('price', productInfo.price)
    formData.append('productType', productInfo.productType)
    formData.append('techSpecs', JSON.stringify(productInfo.techSpecs))
    formData.append('typeNewRefurbished', productInfo.typeNR)
    formData.append('Stock', productInfo.stock)
    formData.append('Soldby', userData.username)
    formData.append('SellerContact', userData.email)

    const token = localStorage.getItem('token');

    if (token) {
      const response = await fetch(`${proxy}/create_product`, {
        method: 'POST',
        headers: { 'authorization': `token ${token}` },
        body: formData
      })

      let resResult;
      await response.json().then((result) => (resResult = result));

      if (!response.ok) {
        throw resResult.message;
      } else {
        setShowConfirmationModal(false)
        toast.success('Product Published Successfully')
        navigate('/', { replace: true })
      }
    } else {
      throw 'Session Timed Out!!'
    }
  } catch (error) {
    toast.error("Unable to Publish" + error);
    console.error("Error:", error);
  }
}

// const Get all Products
export const getAllProducts = async (category) => {
  try {
    const formData = new FormData();
    formData.append('category', category)

    const response = await fetch(`${proxy}/get_all_products`, {
      method: 'POST',
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult.data
    }
  } catch (error) {
    toast.error("Unable to Get Products" + error);
    console.error("Error:", error);
  }
}

// get myAds
export const getMyAds = async () => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await fetch(`${proxy}/get_my_ads`, {
        method: 'GET',
        headers: { 'authorization': `token ${token}` },
      })

      let resResult;
      await response.json().then((result) => (resResult = result));

      if (!response.ok) {
        throw resResult.message;
      } else {
        return resResult.data
      }
    }
  } catch (error) {
    toast.error("Unable to Get Products" + error);
    console.error("Error:", error);
  }
}

//Edit Product
export const editProduct = async (productData, setShowEditConfirmationModal, setShowEditProduct, navigate) => {
  try {
    const formData = new FormData();
    formData.append('id', productData.id)
    formData.append('productName', productData.productName)
    formData.append('description', productData.description)
    formData.append('discount', productData.discount)
    productData.images.map(image => formData.append('images', image))
    formData.append('manufacturer', productData.manufacturer)
    formData.append('price', productData.price)
    formData.append('productType', productData.productType)
    formData.append('techSpecs', JSON.stringify(productData.techSpecs))
    formData.append('typeNewRefurbished', productData.typeNR)
    formData.append('Stock', productData.stock)

    const token = localStorage.getItem('token');

    if (token) {
      const response = await fetch(`${proxy}/edit_product`, {
        method: 'PUT',
        headers: { 'authorization': `token ${token}` },
        body: formData,
      })

      let resResult;
      await response.json().then((result) => (resResult = result));

      if (!response.ok) {
        throw resResult.message;
      } else {
        console.log(setShowEditConfirmationModal)
        toast.success('Product Updated Successfully')
        setShowEditConfirmationModal(false);
        setShowEditProduct(false);
        navigate('/my_ads', { replace: true })
        return resResult.data
      }
    }
  } catch (error) {
    toast.error("Unable to Edit" + error);
    console.error("Error:", error);
  }
}

//get Product
export const getProduct = async (id) => {
  try {
    if (!id) throw 'Invalid ID'

    const formData = new FormData();
    formData.append('id', id)

    const response = await fetch(`${proxy}/get_product`, {
      method: 'POST',
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult.data
    }
  } catch (error) {
    if (error) {
      toast.error('Failed to get Product Data' + error)
    }
  }
}

//user Review
export const userRatingToProduct = async (ratingData) => {
  try {
    if (!ratingData.id) throw 'Invalid ID'

    const formData = new FormData();
    formData.append('id', ratingData.id)
    formData.append('starRating', ratingData.starRating)
    formData.append('review', ratingData.review)
    formData.append('user', ratingData.user)
    formData.append('username', ratingData.username)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/product_review`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Thanks for Reviewing')
      return resResult
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Review' + error)
    }
  }
}

//Add to Cart
export const addToCart = async (userAndProduct) => {
  try {
    const formData = new FormData();
    formData.append('username', userAndProduct.username);
    formData.append('productId', userAndProduct.id)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/add_to_cart`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Added to Cart')
      return resResult
    }
  } catch (error) {
    if (error) {
      toast.error('Failed to Add to Cart' + error)
    }
  }
}

//get Cart Data
export const getCartData = async (username) => {
  try {
    const formData = new FormData();
    formData.append('username', username)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/cart_data`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult.data
    }
  } catch (error) {
    if (error) {
      toast.error('Failed to get Cart data' + error)
    }
  }
}

//Manage Quanity of product in Cart
export const manageProductQuantity = async (userProductDataAndQuantity) => {
  try {
    const formData = new FormData();
    formData.append('username', userProductDataAndQuantity.username);
    formData.append('productId', userProductDataAndQuantity.productId);
    formData.append('updateQuantityBy', userProductDataAndQuantity.update)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/product_cart_quantity`, {
      method: 'PUT',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult
    }
  } catch (error) {
    if (error) {
      toast.error('Failed to get Cart data' + error)
    }
  }
}

//Remove Product from Cart
export const removeProductFromCart = async (productAndUserData) => {
  try {
    const formData = new FormData();
    formData.append('username', productAndUserData.username);
    formData.append('productId', productAndUserData.productId);

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/remove_cart_product`, {
      method: 'DELETE',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Removed from Cart')
      return resResult
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Remove' + error)
    }
  }
}

// Add Product to Wishlist
export const addProductToWishlist = async (userAndProduct) => {
  try {
    const formData = new FormData();
    formData.append('username', userAndProduct.username);
    formData.append('productId', userAndProduct.id)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/add_to_wishlist`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Added to Wishlist')
      return resResult
    }
  } catch (error) {
    if (error) {
      toast.error('Failed to Add to Wishlist' + error)
    }
  }
}

//get wishlist Products
export const getWishlistData = async (username) => {
  try {
    const formData = new FormData();
    formData.append('username', username)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/wishlist_data`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult.data
    }
  } catch (error) {
    if (error) {
      toast.error('Failed to get Wishlist data' + error)
    }
  }
}

//Remove Product from Wishlist
export const removeProductFromWishlist = async (productAndUserData) => {
  try {
    const formData = new FormData();
    formData.append('username', productAndUserData.username);
    formData.append('productId', productAndUserData.productId);

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/remove_wishlist_product`, {
      method: 'DELETE',
      headers: { 'authorization': `token ${token}` },
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Removed from Wishlist')
      return resResult
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Remove' + error)
    }
  }
}

// get search Data
export const getSearchData = async (searchTerm) => {
  try {
    const formData = new FormData();
    formData.append('searchTerm', searchTerm);

    const response = await fetch(`${proxy}/search`, {
      method: 'POST',
      body: formData,
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult.data
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Remove' + error)
    }
  }
}

// add Address to User Data
export const addAddress = async (userAndAddressData, showAddAddressModal, dispatch) => {
  try {
    const { username,
      firstName,
      lastName,
      address,
      landmark,
      selectedState,
      selectedCity,
      pincode,
      phoneNumber } = userAndAddressData;

    const formData = new FormData();
    formData.append('username', username)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('address', address)
    formData.append('selectedState', selectedState)
    formData.append('landmark', landmark)
    formData.append('selectedCity', selectedCity)
    formData.append('pincode', pincode)
    formData.append('phoneNumber', phoneNumber)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/add_address`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Added Address Successfully')
      await getUserAddress(username, dispatch)
      showAddAddressModal(false)
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Add Address' + error)
    }
  }
}

export const getUserAddress = async (username, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('username', username)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/get_address`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      dispatch(mainSliceActions.loggedUserAddress([...resResult?.address]));
    }
  } catch (error) {
    if (error) {
      toast.error(error)
    }
  }
}

export const editAddress = async (editData, showAddAddressModal, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('username', editData.username)
    formData.append('addressId', editData.addressId)
    formData.append('firstName', editData.firstName)
    formData.append('lastName', editData.lastName)
    formData.append('address', editData.address)
    formData.append('selectedState', editData.selectedState)
    formData.append('landmark', editData.landmark)
    formData.append('selectedCity', editData.selectedCity)
    formData.append('pincode', editData.pincode)
    formData.append('phoneNumber', editData.phoneNumber)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/edit_address`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Address Updated SuccessFully')
      dispatch(mainSliceActions.loggedUserAddress([...resResult?.address]));
      showAddAddressModal(false)
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Update Address' + error)
    }
  }
}

export const deleteAddress = async (editData, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('username', editData.username)
    formData.append('addressId', editData.addressId)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/delete_address`, {
      method: 'DELETE',
      headers: { 'authorization': `token ${token}` },
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success('Address Deleted SuccessFully')
      dispatch(mainSliceActions.loggedUserAddress([...resResult?.address]));
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Delete Address' + error)
    }
  }
}

//Code to Apply COUPONS
export const verifyCoupon = async (couponCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('couponCode', couponCode)

      const token = localStorage.getItem('token');

      const response = await fetch(`${proxy}/verify_coupon`, {
        method: 'POST',
        headers: { 'authorization': `token ${token}` },
        body: formData
      })

      let resResult;
      await response.json().then((result) => (resResult = result));

      if (!response.ok) {
        throw resResult.message;
      } else {
        resolve(resResult)
      }
    } catch (error) {
      if (error) {
        reject(error)
      }
    }
  })
}

//Place Order
export const placeOrder = async (bookingDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('username', bookingDetails.username)
      formData.append('productId', bookingDetails.productId)
      formData.append('shippingAddress', JSON.stringify(bookingDetails.shippingAddress))
      formData.append('couponCode', bookingDetails.couponCode)
      formData.append('couponDiscount', bookingDetails.couponDiscount)
      formData.append('actualPrice', bookingDetails.actualPrice)
      formData.append('discount', bookingDetails.discount)
      formData.append('finalPrice', bookingDetails.finalPrice)
      formData.append('paymentMode', bookingDetails.paymentMode)
      formData.append('buyingQuantity', bookingDetails.buyingQuantity)

      const token = localStorage.getItem('token');

      const response = await fetch(`${proxy}/place_order`, {
        method: 'POST',
        headers: { 'authorization': `token ${token}` },
        body: formData
      })

      let resResult;
      await response.json().then((result) => (resResult = result));

      if (!response.ok) {
        throw resResult.message;
      } else {
        resolve(resResult)
      }
    } catch (error) {
      if (error) {
        reject(error)
      }
    }
  })
}

//get Order Details 
export const getOrderDetails = async (orderData) => {
  try {
    const formData = new FormData();
    formData.append('username', orderData.username)
    formData.append('orderId', orderData.orderId)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/get_Order`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult.data
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to get Order Details' + error)
    }
  }
}

//get All Orders
export const getAllOrders = async (username) => {
  try {
    const formData = new FormData();
    formData.append('username', username)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/get_All_Orders`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      return resResult.data
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to get Order Details ' + error)
    }
  }
}

//Cancel Order
export const cancelOrder = async (orderData) => {
  try {
    const formData = new FormData();
    formData.append('username', orderData.username)
    formData.append('orderId', orderData.orderId)

    const token = localStorage.getItem('token');

    const response = await fetch(`${proxy}/cancel_order`, {
      method: 'POST',
      headers: { 'authorization': `token ${token}` },
      body: formData
    })

    let resResult;
    await response.json().then((result) => (resResult = result));

    if (!response.ok) {
      throw resResult.message;
    } else {
      toast.success(resResult.message)
      setTimeout(() => {
        window.location.reload()
      }, 2500)
    }
  } catch (error) {
    if (error) {
      toast.error('Unable to Cancel Order ' + error)
    }
  }
}