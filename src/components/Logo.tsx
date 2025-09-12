import config from "@/config/config.json";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  src?: string;
  alt?: string;
  title?: string;
  url?: string;
}

export default function Logo(props: LogoProps) {
  const site = config.site;
  const logo = {
    url: props.url ?? site.base_url ?? "/",
    src: props.src ?? site.logo,
    srcDark: site.logo_darkmode,
    alt: props.alt ?? site.logo_text ?? site.title,
    width: Number(site.logo_width) || 150,
    height: Number(site.logo_height) || 27,
    text: props.title ?? site.logo_text ?? site.title,
  };

  const logoSrc = logo.src || logo.srcDark;

  return (
    <Link href={logo.url} className="flex items-center gap-2">
      {logoSrc && (
        <Image
          width={logo.width}
          height={logo.height}
          src={logoSrc}
          className="max-h-8 dark:hidden"
          alt={logo.alt}
        />
      )}
      {!logoSrc && (
        <span className="text-lg font-semibold tracking-tighter">
          {logo.text}
        </span>
      )}
    </Link>
  );
}
