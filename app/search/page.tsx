import { SearchResults } from "@/components/shop/search-results";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Lookbook",
  description: "Studio pictures from jaynee.ng.",
  path: "/search",
});

export default function SearchPage() {
  return <SearchResults />;
}
