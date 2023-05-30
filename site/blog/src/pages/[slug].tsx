import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import ShikiRemarkPlugin from "remark-shiki-plugin";
import { getPostBySlug, getAllPosts } from "@/../lib/posts";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default (props: any) => {
  const { post, prev, next } = props;

  return (
    <Layout>
      <Seo
        title={post?.frontmatter?.title || ""}
        description={post?.frontmatter?.description || post?.excerpt || ""}
      />
      <div className="prose prose-slate mx-auto">
        <header className="text-3xl pb-6 font-extrabold">
          {post.frontmatter.title}
        </header>
        <article dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="flex justify-between my-12 text-sm">
          <span>
            {prev && (
              <Link
                href={prev.slug}
                className="inline-flex items-center min-w-0"
              >
                <ChevronLeftIcon className="mr-1 h-4 w-4 group-hover:text-gray-500" />
                <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {prev.title}
                </span>
              </Link>
            )}
          </span>
          <span>
            {next && (
              <Link
                href={next.slug}
                className="inline-flex items-center min-w-0"
              >
                <span className="break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {next.title}
                </span>

                <ChevronRightIcon className=" ml-1 h-4 w-4 group-hover:text-gray-500" />
              </Link>
            )}
          </span>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }: any) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .use(ShikiRemarkPlugin, {
      theme: "nord",
      themes: ["nord", "nord"],
      generateMultiCode: true,
    })
    .process(post.content || "");

  //

  const posts = getAllPosts();

  const idx = posts.findIndex((c) => c.slug === params.slug);

  const next = posts[idx + 1];
  const prev = posts[idx - 1];

  return {
    props: {
      post: { ...post, html: markdown.toString() },
      prev: prev ? { title: prev.frontmatter.title, slug: prev.slug } : null,
      next: next ? { title: next.frontmatter.title, slug: next.slug } : null,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}
