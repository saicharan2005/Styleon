const Address = require("../../models/Address.js");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    // console.log(userId, address, city, pincode, phone, notes);
    

    if (!userId || !address || !city || !pincode || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Data provided" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Address added successfully",
        data: newAddress,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is mandatory" });
    }

    const addressList = await Address.find({ userId });
    if (!addressList) {
      return res
        .status(404)
        .json({ success: false, message: "No addresses found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Addresses fetched successfully",
        data: addressList,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "userId and addressId are mandatory",
        });
    }

    const address = await Address.findOneAndUpdate(
      {
        userId,
        _id: addressId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Address updated successfully",
        data: address,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressId are mandatory",
      });
    }

    
    const address = await Address.findOneAndDelete({
      userId,
      _id: addressId,
    });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
