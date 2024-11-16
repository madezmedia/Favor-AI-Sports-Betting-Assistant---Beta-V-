import { google } from 'googleapis';
import { format } from 'date-fns';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEETS_ID;

export interface GameData {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeSpread: number;
  awaySpread: number;
  homeOdds: number;
  awayOdds: number;
  overUnder: number;
}

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    keyFile: 'credentials.json',
  });
  return auth.getClient();
}

export async function fetchTodaysGames(): Promise<GameData[]> {
  try {
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    const today = format(new Date(), 'yyyy-MM-dd');

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Games!A2:I',
    });

    const rows = response.data.values;
    if (!rows?.length) return [];

    return rows
      .filter(row => row[1] === today)
      .map(row => ({
        id: row[0],
        date: row[1],
        homeTeam: row[2],
        awayTeam: row[3],
        homeSpread: parseFloat(row[4]),
        awaySpread: parseFloat(row[5]),
        homeOdds: parseFloat(row[6]),
        awayOdds: parseFloat(row[7]),
        overUnder: parseFloat(row[8]),
      }));
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}