import Image from "next/image";
import { client } from "@/sanity/client";
import { IconListItemModel } from "@/types/homepage";

// GROQ query to fetch homepage data
const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  headerSection {
    heading,
    image
  },
  iconListSection[]{
    title,
    body,
    icon
  }
}`;

export default async function IndexPage() {
  const data = await client.fetch(HOMEPAGE_QUERY);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      {/* Header Section */}
      {data?.headerSection && (
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {data.headerSection.heading}
          </h1>
          {data.headerSection.image &&
            data.headerSection.image.asset &&
            data.headerSection.image.asset.url && (
              <div className="flex justify-center">
                <Image
                  src={data.headerSection.image.asset.url}
                  alt={data.headerSection.heading || "Header image"}
                  width={600}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            )}
        </section>
      )}

      {/* Icon List Section */}
      {data?.iconListSection && data.iconListSection.length > 0 && (
        <section>
          <ul className="grid gap-8 md:grid-cols-2">
            {data.iconListSection.map(
              (item: IconListItemModel, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg"
                >
                  {item.icon && item.icon.asset && (
                    <Image
                      src={item.icon.asset.url}
                      alt={item.title || "Icon"}
                      width={48}
                      height={48}
                      className="flex-shrink-0"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-700">{item.body}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </section>
      )}
    </main>
  );
}
