import {
  IMDBLogo,
  InstagramLogo,
  LinkedInLogo,
  VimeoLogo,
  YoutubeLogo,
} from "~/icons/BrandIcons";

export default function Footer() {
  return (
    <div className="fixed bottom-0 h-36 w-screen">
      <div className="flex justify-center">
        <a
          href="https://www.instagram.com/_abigailthesnail_/"
          target="_blank"
          rel="noreferrer"
          className="mx-2"
        >
          <InstagramLogo height={20} width={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/abigail-weinick/"
          target="_blank"
          rel="noreferrer"
          className="mx-2"
        >
          <LinkedInLogo height={20} width={20} />
        </a>
        <a href="https://vimeo.com/abigailm" target="_blank" rel="noreferrer">
          <VimeoLogo height={20} width={20} />
        </a>
        <a
          href="https://www.youtube.com/channel/UCPIjchDkDoWPC9xz_wWMAwQ"
          target="_blank"
          rel="noreferrer"
          className="ml-2"
        >
          <YoutubeLogo height={20} width={20} />
        </a>
        <a
          href="https://www.imdb.com/name/nm11670632/?ref_=nm_mv_close"
          target="_blank"
          rel="noreferrer"
          className="mx-2"
        >
          <IMDBLogo height={20} width={20} />
        </a>
      </div>
    </div>
  );
}
