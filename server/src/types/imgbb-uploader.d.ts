declare module "imgbb-uploader" {
  interface ImgbbResponse {
    url: string;
    display_url: string;
    id: string;
    title: string;
    delete_url: string;
  }

  function imgbbUploader(apiKey: string, imagePath: string): Promise<ImgbbResponse>;
  export default imgbbUploader;
}
