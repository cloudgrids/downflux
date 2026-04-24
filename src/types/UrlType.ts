export enum UrlType {
  /** <a href> anchor links — highest quality, direct source */
  ANCHORS = 'ANCHORS',
  /** <img src / data-src / data-lazy / data-original> */
  IMAGES = 'IMAGES',
  /** <div href="..."> — some boards embed hrefs on divs */
  DIV_HREFS = 'DIV_HREFS',
  /** <source src="..."> — audio/video embeds */
  SOURCES = 'SOURCES',
  /** <video poster="..."> — thumbnail previews */
  VIDEO_POSTER = 'VIDEO_POSTER',
  /** All https?:// URLs found anywhere in the HTML */
  ALL_URLS = 'ALL_URLS',
}