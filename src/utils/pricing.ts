export interface PrintSettings {
  serviceType: 'A4_DOCUMENT' | 'SOFT_BINDING';
  copies: number;
  colorMode: 'B_AND_W' | 'COLOR';
  sides: 'FRONT_ONLY' | 'FRONT_AND_BACK';
  pageCount: number;
}

export const calculateItemPrice = (
  settings: PrintSettings, 
  rates?: { bw?: number; color?: number; binding?: number }
): number => {
  let price = 0;
  
  if (settings.serviceType === 'SOFT_BINDING') {
    price += (rates?.binding ?? 35) * settings.copies;
  }
  
  // Base price per printed page (default BW = 3, Color = 12)
  const pricePerPage = settings.colorMode === 'COLOR' 
    ? (rates?.color ?? 12) 
    : (rates?.bw ?? 3);
  
  const pagesToPrint = settings.pageCount;
  price += (pagesToPrint * pricePerPage * settings.copies);
  
  return price;
};

export const calculateDeliveryFee = (subtotal: number): number => {
  return subtotal > 35 ? 0 : 5;
};

export const getOrderFlag = (subtotal: number): 'TOO_SMALL_ORDER' | 'NORMAL' => {
  return subtotal < 6 ? 'TOO_SMALL_ORDER' : 'NORMAL';
};
