import { useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import Head from "next/head";
// import { graphql, Link } from "gatsby";
// import type { PageProps } from "gatsby";
import ScrollReveal from "scrollreveal";
import { CalendarIcon } from "@heroicons/react/24/outline";

import { getAllPosts } from "../../lib/posts";

import Seo from "../components/Seo";
import Layout from "../components/Layout";
import PostLabel from "../components/PostLabel";

// const filterCategory = (name: string) => {
//   const types = {
//     css: ["css", "css3", "scss", "less"],
//     js: ["javascript", "ecmaScript", "js", "jsx", "ts", "typescript", "node"],
//     md: ["md", "markdown"],
//     jsx: ["jsx", "tsx", "react"],
//   };

//   for (let [key, value] of Object.entries(types)) {
//     if (value.find((type) => type.toUpperCase() === name.toUpperCase())) {
//       return key;
//     }
//   }
//   return "jsx";
// };

const Index = ({ data }: any) => {
  // useLayoutEffect(() => {
  //   ScrollReveal().reveal(".section", {
  //     delay: 500,
  //     useDelay: "onload",
  //     reset: true,
  //     // origin: "right",
  //     distance: "120px",
  //   });
  //   return () => {
  //     ScrollReveal().destroy();
  //   };
  // }, []);

  return (
    <Layout>
      <Seo title="Stories" />
      <div className="uppercase py-1 mb-4 -mt-8 text-sm text-center font-medium tracking-widest text-slate-400">
        Total {data.length} Posts
      </div>
      <div className="grid gap-8 max-w-screen-lg m-auto">
        {data.map((node: any) => (
          <Link
            href={node.slug}
            className="p-6 section rounded-lg overflow-hidden cursor-pointer bg-slate-50 text-sm transition hover:shadow-lg hover:transition"
            key={node.slug}
          >
            <div className="text-slate-400 text-sm leading-none flex items-center">
              <time className="post-time inline-flex items-center my-2">
                <CalendarIcon className="mr-1 w-4 h-4 text-indigo-600" />
                {node.frontmatter.date}
              </time>
              <span className="mx-2 w-0.5 h-0.5 rounded-full bg-slate-400" />
              {/* {node.frontmatter.category} */}
              {node.frontmatter.tags.map((tag: string) => (
                <PostLabel title={tag} key={tag} />
              ))}
            </div>
            <h2 className="pt-1 pb-2 text-xl text-slate-700 hover:text-indigo-800 break-all whitespace-nowrap overflow-hidden overflow-ellipsis">
              {node.frontmatter.title}
            </h2>

            <p className="text-slate-500 line-clamp-3">{node.excerpt}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const data = getAllPosts();
  return {
    props: { data },
  };
}
