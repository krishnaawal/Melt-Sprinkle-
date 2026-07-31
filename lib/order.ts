export const PRODUCT_NAME = "Himalaya Great Foods Cheese Powder Pop Corn Seasoning Blast – 100G";
export const PRODUCT_PRICE = 114;
export const DELIVERY_CHARGE = 100;

export type OrderPayload = {
  customerName: string; mobile: string; province: string; district: string; municipality: string;
  area: string; address: string; landmark: string; quantity: number; orderNote: string;
};

export async function submitOrder(orderData: OrderPayload) {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!url) {
    await new Promise((resolve) => setTimeout(resolve, 550));
    return { ok: true, orderId: `HGF-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.floor(1000 + Math.random() * 9000)}`, demo: true };
  }
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(orderData) });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) throw new Error(result?.error || "We could not send your order. Please try again.");
  return result;
}
