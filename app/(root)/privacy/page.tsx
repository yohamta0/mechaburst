import { LanguageRedirect, redirectMeta } from "@/components/LanguageRedirect";

export const metadata = redirectMeta("privacy");

export default function PrivacyEntry() {
  return <LanguageRedirect slug="privacy" />;
}
