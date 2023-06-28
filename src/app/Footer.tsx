import {
  IMDBLogo,
  InstagramLogo,
  LinkedInLogo,
  VimeoLogo,
  YoutubeLogo,
} from "~/icons/BrandIcons";

export default function Footer() {
  return (
    <div className="absolute bottom-0 pt-4 pb-24 w-screen">
      <div className="flex justify-center">
        <a
          href="https://www.instagram.com/_abigailthesnail_/"
          target="_blank"
          rel="noreferrer"
          className="ml-2 hover:scale-110 transition-all duration-200 ease-in-out transform"
        >
          <InstagramLogo height={20} width={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/abigail-weinick/"
          target="_blank"
          rel="noreferrer"
          className="ml-2 mr-1 hover:scale-110 transition-all duration-200 ease-in-out transform"
        >
          <LinkedInLogo height={20} width={20} />
        </a>
        <a
          href="https://vimeo.com/abigailm"
          target="_blank"
          rel="noreferrer"
          className="hover:scale-110 transition-all duration-200 ease-in-out transform"
        >
          <VimeoLogo height={20} width={20} />
        </a>
        <a
          href="https://www.youtube.com/channel/UCPIjchDkDoWPC9xz_wWMAwQ"
          target="_blank"
          rel="noreferrer"
          className="ml-1 mr-2 hover:scale-110 transition-all duration-200 ease-in-out transform"
        >
          <YoutubeLogo height={20} width={20} />
        </a>
        <a
          href="https://www.imdb.com/name/nm11670632/?ref_=nm_mv_close"
          target="_blank"
          rel="noreferrer"
          className="mr-2 hover:scale-110 transition-all duration-200 ease-in-out transform"
        >
          <IMDBLogo height={20} width={20} />
        </a>
      </div>
    </div>
  );
}
