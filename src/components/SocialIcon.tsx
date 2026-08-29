import { Mail } from "lucide-react";
import type { SocialLink } from "@/lib/content";
import { GithubMark, LinkedinMark } from "./icons";

const map = {
  Github: GithubMark,
  Linkedin: LinkedinMark,
  Mail,
} as const;

export default function SocialIcon({
  name,
  size = 18,
}: {
  name: SocialLink["icon"];
  size?: number;
}) {
  const Cmp = map[name];
  return <Cmp size={size} />;
}
