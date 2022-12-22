export interface ITemplate {
  name: string;
  description: string;
  content: any;
}

export interface ITemplateDetails extends ITemplate {
  id: number;
  tags: string[];
}