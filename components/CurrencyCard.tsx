
import React from 'react';
import { CurrencyData } from '../types';

interface CurrencyCardProps {
  currency: CurrencyData;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ currency }) => {
  const formatRate = (rate: number) => {
    return rate.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{currency.flagEmoji}</span>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{currency.country}</h3>
          <p className="text-sm text-slate-500">{currency.currencyName} ({currency.currencyCode})</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
          <span className="text-slate-600 font-medium">Compra (USD):</span>
          <span className="text-lg font-semibold text-green-600">${formatRate(currency.buyRate)}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
          <span className="text-slate-600 font-medium">Venta (USD):</span>
          <span className="text-lg font-semibold text-red-600">${formatRate(currency.sellRate)}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-4 text-right">Actualizado: {currency.lastUpdated}</p>
    </div>
  );
};

export default CurrencyCard;
