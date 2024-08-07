class ClientDataModel {
  constructor(data) {
    this.clientName = data.clientName || "";
    this.email = data.email || "";
    this.mobile = data.mobile || "";
    this.alternateMobile = data.alternateMobile || "";
    this.addressLine1 = data.addressLine1 || "";
    this.addressLine2 = data.addressLine2 || "";
    this.pinCode = data.pinCode || "";
    this.city = data.city || "";
    this.state = data.state || "";
    this.gstNo = data.gstNo || "";
  }
}

module.exports = { ClientDataModel };
