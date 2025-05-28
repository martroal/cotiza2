
export interface CurrencyData {
  id: string;
  country: string;
  currencyName: string;
  currencyCode: string;
  flagEmoji: string;
  buyRate: number;
  sellRate: number;
  lastUpdated: string;
}

export interface ChatMessageData {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}
