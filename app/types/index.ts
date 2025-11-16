export interface ILocation {
  short_code: string;
  english_name: string;
  code_state: string;
}

export interface IFormInputs {
  from: ILocation | null;
  to: ILocation | null;
  departureDate: string;
  returnDate: string | null;
  isRoundTrip: boolean;
  passengers: number;
}

export interface ITab {
  id: number;
  label: string;
  icon:
    | string
    | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    | undefined;
  style: { backgroundColor: string; color: string };
}
