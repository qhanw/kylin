import { Link } from "gatsby";

export default ({ siteMetadata }: any) => (
  <footer className="pt-4 text-center pb-12">
    {[
      { title: "Github", url: "http://github.com/qhanw", target: "_blank" },
      { title: "YuQue", url: "https://www.yuque.com/qhan", target: "_blank" },
      {
        title: "JunJin",
        url: "https://juejin.cn/user/342703357833255",
        target: "_blank",
      },
    ].map(({ url, title, ...rest }) => (
      <Link
        className="inline-block text-gray-300 px-4 py-2 text-sm"
        to={url}
        key={title}
        {...rest}
      >
        {title}
      </Link>
    ))}
  </footer>
);
