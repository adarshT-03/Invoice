class BusinessDataModel {
  constructor(data) {
    this.businessName = data.businessName || "";
    this.email = data.email || "";
    this.mobile = data.mobile || "";
    this.alternateMobile = data.alternateMobile || "";
    this.addressLine1 = data.addressLine1 || "";
    this.pinCode = data.pinCode || "";
    this.city = data.city || "";
    this.state = data.state || "";
    this.gstNo = data.gstNo || "";
    this.panNo = data.panNo || "";
    this.bankAccountNo = data.bankAccountNo || "";
    this.ifscCode = data.ifscCode || "";
  }
}

module.exports = { BusinessDataModel };
