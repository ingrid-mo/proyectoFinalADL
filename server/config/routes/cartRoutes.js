import express from "express";

import { 
        getCartUser,
        addCartUser,
        updateCartIncrease,
        updateCartDecrease,
        getAllCart
             } from "../../src/api/v1/controllers/cartController.js";
import { getActivity } from "../../middlewares/reports.js";
 import { isLogin } from "../../middlewares/isLogin.js";

const router = express.Router();


router.get("/carts/", isLogin, getActivity, getAllCart) 
router.get("/cart/", isLogin, getActivity, getCartUser);
router.post("/cart/",  isLogin, getActivity, addCartUser);
router.put("/cartIncrease/:id", isLogin, getActivity, updateCartIncrease);
router.put("/cartDecrease/:id",  isLogin, getActivity, updateCartDecrease);



export default router;