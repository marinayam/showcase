import Image from "next/image";

const Footer = () => (
  <section className="flexStart footer">
    <div className="flex flex-col gap-12 w-full">
      <div className="flex items-start flex-col">
        <Image src="/logo.png" width={116} height={38} alt="logo" />
        <p className="text-start text-sm font-normal mt-5 max-w-xs">
          showcaseはあなたの実績を共有したり、他の人のプロジェクトを検索してアイディアを得たり、ビジネスを広げるためのコミュニティアプリです
        </p>
      </div>
    </div>
    <div className="flexBetween footer_copyright">
      <p>@ 2023 showcase. All rights reserved</p>
    </div>
  </section>
);

export default Footer;