const SHEET_NAME = 'Orders';
const PRODUCT_NAME = 'Himalaya Great Foods Cheese Powder Pop Corn Seasoning Blast – 100G';
const UNIT_PRICE = 114;
const DELIVERY_CHARGE = 100;

function doPost(e) {
  try {
    const data = JSON.parse(e && e.postData && e.postData.contents ? e.postData.contents : '{}');
    const required = ['customerName', 'mobile', 'province', 'district', 'municipality', 'address', 'quantity'];
    required.forEach(function (field) { if (!data[field] || String(data[field]).trim() === '') throw new Error('Missing required field: ' + field); });
    if (!/^9[678]\d{8}$/.test(String(data.mobile).replace(/\D/g, ''))) throw new Error('Invalid Nepal mobile number');
    const quantity = Number(data.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) throw new Error('Invalid quantity');
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp','Order ID','Customer Name','Mobile Number','Province','District','Municipality or City','Area or Locality','Full Address','Landmark','Product Name','Unit Price','Quantity','Subtotal','Delivery Charge','Total Amount','Payment Method','Order Note','Order Status','Source']);
    const date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd');
    const orderId = 'HGF-' + date + '-' + Math.floor(1000 + Math.random() * 9000);
    const subtotal = UNIT_PRICE * quantity;
    sheet.appendRow([new Date(), orderId, data.customerName, data.mobile, data.province, data.district, data.municipality, data.area || '', data.address, data.landmark || '', PRODUCT_NAME, UNIT_PRICE, quantity, subtotal, DELIVERY_CHARGE, subtotal + DELIVERY_CHARGE, 'Cash on Delivery', data.orderNote || '', 'New', 'Website']);
    return json({ success: true, orderId: orderId });
  } catch (error) { return json({ success: false, error: error.message || 'Invalid order' }); }
}
function json(body) { return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON); }
