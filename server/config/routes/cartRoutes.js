import express from "express";

import { 
        getCartUser,
        addCartUser,
        updateCartIncrease,
        updateCartDecrease,
        getAllCart,
        getAllCartbyUser
             } from "../../src/api/v1/controllers/cartController.js";
import { getActivity } from "../../middlewares/reports.js";
import { isLogin } from "../../middlewares/isLogin.js";

const router = express.Router();

router.get("/carts/", isLogin, getActivity, getAllCart) 
router.get("/cart/:id_user", isLogin, getActivity, getCartUser);
router.get("/cart/all/:id", isLogin, getActivity, getAllCartbyUser);
router.post("/cart/", isLogin, getActivity, addCartUser);
router.put("/cart/increase/:product_id", isLogin, getActivity, updateCartIncrease);
router.put("/cart/decrease/:product_id", isLogin, getActivity, updateCartDecrease);




export default router;