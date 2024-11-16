export interface PlayerOdds {
  market_label: string;
  player: {
    name: string;
    position: string;
    team: string;
  };
  selections: Array<{
    label: string;
    books: Array<{
      id: number;
      bookie: string;
      line: {
        cost: number;
        line: number;
      };
    }>;
  }>;
}

export interface BookieOdds {
  id: number;
  bookie: string;
  line: {
    cost: number;
    line: number;
  };
}

export type MarketType = 'Points' | 'Assists' | 'Rebounds' | 'Blocks' | 'Steals' | 'Three Points Made';

export interface PlayerMarketOdds {
  [marketType: string]: {
    over: BookieOdds[];
    under: BookieOdds[];
  };
}