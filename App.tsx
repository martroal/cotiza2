
import React, { useState, useEffect } from 'react';
import CurrencyCard from './components/CurrencyCard';
import ChatPopup from './components/ChatPopup'; // Import ChatPopup
import { CurrencyData } from './types';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-white p-6 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center">Cotizaciones de Divisas</h1>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-700 text-slate-300 p-4 mt-12">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} App de Cotizaciones. Todos los derechos reservados.</p>
        <p>Datos de ejemplo con fines ilustrativos.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call
    const fetchCurrencyData = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const formattedDate = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const lastUpdated = `${formattedDate} ${formattedTime}`;

      const mockData: CurrencyData[] = [
        {
          id: 'ves',
          country: 'Venezuela',
          currencyName: 'Bolívar Soberano',
          currencyCode: 'VES',
          flagEmoji: '🇻🇪',
          buyRate: 36.45, // Example rate
          sellRate: 36.98, // Example rate
          lastUpdated: lastUpdated,
        },
        {
          id: 'ars',
          country: 'Argentina',
          currencyName: 'Peso Argentino',
          currencyCode: 'ARS',
          flagEmoji: '🇦🇷',
          buyRate: 890.50, // Example rate
          sellRate: 935.25, // Example rate
          lastUpdated: lastUpdated,
        },
        {
          id: 'cop',
          country: 'Colombia',
          currencyName: 'Peso Colombiano',
          currencyCode: 'COP',
          flagEmoji: '🇨🇴',
          buyRate: 3950.00, // Example rate
          sellRate: 4050.75, // Example rate
          lastUpdated: lastUpdated,
        },
        {
          id: 'mxn',
          country: 'México',
          currencyName: 'Peso Mexicano',
          currencyCode: 'MXN',
          flagEmoji: '🇲🇽',
          buyRate: 17.85, // Example rate
          sellRate: 18.20, // Example rate
          lastUpdated: lastUpdated,
        },
      ];
      setCurrencies(mockData);
      setIsLoading(false);
    };

    setTimeout(fetchCurrencyData, 1000); // Simulate network delay
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">
            Tasas de Cambio Actuales (USD)
          </h2>
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Cargando cotizaciones...</p>
            </div>
          ) : currencies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6"> {/* Changed md:grid-cols-2 to grid-cols-1 */}
              {currencies.map((currency) => (
                <CurrencyCard key={currency.id} currency={currency} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-10">
              No se pudieron cargar las cotizaciones. Intente más tarde.
            </p>
          )}
        </div>
      </main>
      <Footer />
      <ChatPopup /> {/* Add ChatPopup component here */}
    </div>
  );
};

export default App;
