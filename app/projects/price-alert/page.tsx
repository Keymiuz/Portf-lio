import type { Metadata } from 'next';
import { PriceAlertDemo } from '@/components/price-alert-demo';

export const metadata: Metadata = {
  title: 'Sistema de Alerta de Preço | João Pedro',
  description: 'Demo de uma plataforma elegante de alertas de preço com conta mock e persistência local.'
};

export default function PriceAlertPage() {
  return <PriceAlertDemo />;
}
