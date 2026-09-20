import { LanguageRedirect, redirectMeta } from "@/components/LanguageRedirect";

export const metadata = redirectMeta("support");

export default function SupportEntry() {
  return <LanguageRedirect slug="support" />;
}
