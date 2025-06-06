import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { CategoryModel } from "@/utils/models/CategoryModel";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  author-> {
    name
  },
  categories[]-> {
    _id, 
    title
  }
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width={400}
          height={400}
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

      <div className="flex gap-4 text-sm text-gray-600 mb-8">
        {post.publishedAt && (
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        )}
        {post.author?.name && <p>Author: {post.author.name}</p>}
      </div>

      {post.categories?.length > 0 && (
        <div className="flex gap-2 mb-8">
          {post.categories.map((category: CategoryModel) => {
            console.log("Category ID:", category._id);

            return (
              <div
                key={category._id}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {category.title}
              </div>
            );
          })}
        </div>
      )}

      <div className="prose">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
