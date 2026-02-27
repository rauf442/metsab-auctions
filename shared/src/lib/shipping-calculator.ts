// frontend/shared/src/lib/shipping-calculator.ts

export const EVRI_UK_RATES = {
  'Under 1kg': 3.90,
  '1-2kg': 5.78,
  '2-5kg': 7.49,
  '5-10kg': 7.49,
  '10-15kg': 10.99,
} as const;

export const EVRI_INTERNATIONAL_RATES = {
  'France': 8.91,
  'Germany': 8.70,
  'Ireland': 8.89,
  'Italy': 9.22,
  'Spain': 8.83,
  'Netherlands': 9.55,
  'Belgium': 9.49,
  'Austria': 10.08,
  'Switzerland': 11.55,
  'Czech Republic': 10.19,
  'USA': 13.72,
  'Canada': 15.95,
  'Australia': 16.16,
  'New Zealand': 17.77,
  'Japan': 15.05,
  'India': 11.36,
} as const;

export const DEFAULT_INTERNATIONAL_RATE = 15.00;
export const SHIPPING_INVOICE_MULTIPLIER = 5;

export interface ItemDimensions {
  length: number;
  width: number;
  height: number;
  weight?: number;
}

export function calculateVolumetricWeight(dimensions: ItemDimensions): number {
  const { length, width, height } = dimensions;
  return (length * width * height) / 5000;
}

export function getBillableWeight(dimensions: ItemDimensions): number {
  const volumetricWeight = calculateVolumetricWeight(dimensions);
  const actualWeight = dimensions.weight || 0;
  return Math.max(volumetricWeight, actualWeight);
}

export function getUKWeightTier(weight: number): keyof typeof EVRI_UK_RATES {
  if (weight < 1) return 'Under 1kg';
  if (weight <= 2) return '1-2kg';
  if (weight <= 5) return '2-5kg';
  if (weight <= 10) return '5-10kg';
  return '10-15kg';
}

export function calculateUKShippingCost(items: ItemDimensions[]): number {
  const totalWeight = items.reduce((sum, item) => sum + getBillableWeight(item), 0);
  const cappedWeight = Math.min(totalWeight, 15);
  const tier = getUKWeightTier(cappedWeight);
  return EVRI_UK_RATES[tier];
}

export function calculateInternationalShippingCost(
  items: ItemDimensions[], 
  country: string
): number {
  const totalWeight = items.reduce((sum, item) => sum + getBillableWeight(item), 0);
  const cappedWeight = Math.min(totalWeight, 15);
  const baseRate = EVRI_INTERNATIONAL_RATES[country as keyof typeof EVRI_INTERNATIONAL_RATES] 
    || DEFAULT_INTERNATIONAL_RATE;
  return baseRate * cappedWeight;
}

export function calculateShippingInvoiceCost(
  items: ItemDimensions[],
  destination: 'within_uk' | 'international',
  country?: string
): number {
  let baseCost: number;
  if (destination === 'within_uk') {
    baseCost = calculateUKShippingCost(items);
  } else {
    baseCost = calculateInternationalShippingCost(items, country || 'Default');
  }
  return baseCost * SHIPPING_INVOICE_MULTIPLIER;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function getPackagingDimensions(item: { length: number; width: number; height: number; }): ItemDimensions {
  return {
    length: item.length + inchesToCm(2),
    width: item.width + inchesToCm(2),
    height: item.height + inchesToCm(2),
  };
}



