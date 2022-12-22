export interface IFont {
  name: string;
  titleFont: {
    name: string;
    url: string;
    custom?: boolean;
  };
  headerFont: {
    name: string;
    url: string;
    custom?: boolean;
  };
  bodyFont: {
    name: string;
    url: string;
    custom?: boolean;
  };
}
