import type { Metadata } from 'next';
import { PriceAlertDemo } from '@/components/price-alert-demo';

export const metadata: Metadata = {
  title: 'Price Alert System | João Pedro',
  description: 'Interactive demo of a price alert platform with account flow, elegant dashboard, and local persistence.'
};

export default function PriceAlertPage() {
  return <PriceAlertDemo />;
}
