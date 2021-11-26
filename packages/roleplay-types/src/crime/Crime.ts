export interface Crime {
  id: number;
  name: string;
  aliases: string;
  jailTimeInMinutes: number;
  ticketable: boolean;
  ticketCost: number;
  stackable: boolean;
}

export const exampleCrime: Crime = {
  id: 1,
  name: '',
  aliases: '',
  jailTimeInMinutes: 0,
  ticketable: false,
  ticketCost: 0,
  stackable: false,
};
