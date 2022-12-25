const express = require("express")
const router = express.Router()
const customerController = require("../controller/customerController")
const cardController = require("../controller/cardController")
// router.get("/test-me",function(req,res){
//     console.log("Assignment Backent Engineer Test")
// })

router.post("/register",customerController.createCustomer)
router.get("/customers",customerController.getCustomer)
router.get("/customers/:customerID",customerController.getDataById)
router.delete("/customers/:customerID",customerController.deletCustomer)

router.post("/card",cardController.createCard)
router.get("/cardlist",cardController.getCard)







router.all("/**",  (req, res) => {
    return res.status(404).send({ status: false, msg: "Requested path does not exist, Check your URL"})
});

module.exports = router

