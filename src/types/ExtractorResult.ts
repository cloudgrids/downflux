export interface ExtractorResult {
  anchors: string[];
  images: string[];
  sources: string[];
  title: string;
  description: string;
  keywords: string[];
  html: string;
  finalUrl: string;
  status: number;
}
