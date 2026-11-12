"use client";

import { useState } from "react";
import { posts } from "../../../content/gym/posts";
import Icon from "../ui/Icon";
import DemoDialog from "../ui/DemoDialog";

export default function BlogSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section
      className="blog-section section"
      id="blog"
      aria-labelledby="blog-title"
    >
      <div className="page-shell blog-layout">
        <div className="section-intro reveal">
          <span className="eyebrow">BLOG</span>
          <h2 id="blog-title">ブログ</h2>
          <p>
            トレーニング・食事・健康に関する
            <br />
            情報を発信しています。
          </p>
        </div>
        <div className="blog-cards reveal">
          {posts.map((post) => (
            <button
              className="blog-card"
              type="button"
              key={post.title}
              onClick={() => setSelected(post)}
            >
              <img
                src={post.image}
                alt={post.alt}
                width="760"
                height="504"
                loading="lazy"
              />
              <span>
                <small>
                  <time dateTime={post.date.replaceAll(".", "-")}>
                    {post.date}
                  </time>
                </small>
                <strong className="preserve-lines">{post.title}</strong>
              </span>
              <Icon name="arrow" />
            </button>
          ))}
          <button
            className="more-link blog-more"
            type="button"
            onClick={() =>
              setSelected({
                title: "ブログ一覧",
                body: `現在は${posts.length}記事のデモを掲載しています。本番では記事一覧ページへ遷移します。`,
              })
            }
          >
            すべてのブログを見る <Icon name="arrow" />
          </button>
        </div>
      </div>
      <DemoDialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "ブログ記事"}
        titleId="blog-dialog-title"
        eyebrow="BLOG"
      >
        <p>{selected?.body}</p>
        <p className="dialog-note">こちらはサイトの動作確認用サンプルです。</p>
      </DemoDialog>
    </section>
  );
}
