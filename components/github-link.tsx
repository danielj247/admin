import Image from "next/image";

export default function GithubLink() {
  return (
    <a href="https://github.com/danielj247/admin" target="_blank" rel="noreferrer">
      <Image
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        className="h-6 w-6 inline-block"
        width={24}
        height={24}
        alt="github"
      />
      <span className="underline text-sm font-semibold ml-1">@danielj247/admin</span>
    </a>
  );
}
