export interface Crime {
  id: number;
  name: string;
  description: string;
  aliases: string;
  jailTimeInMinutes: number;
  ticketable: boolean;
  ticketCost: number;
  stackable: boolean;
}

export const exampleCrime: Crime = {
  id: 1,
  name: '',
  description: '',
  aliases: '',
  jailTimeInMinutes: 0,
  ticketable: false,
  ticketCost: 0,
  stackable: false,
};
