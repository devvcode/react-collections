import { ArrowUpRight } from "lucide-react";

export default function BlogCard({ post, onOpen }) {
  return (
    <article className="blog-card">
      <button className="card-image-button" type="button" onClick={() => onOpen(post)} aria-label={"Read " + post.title}>
        <img src={post.image} alt="" loading="lazy" />
        <span className="image-arrow"><ArrowUpRight size={17} strokeWidth={1.5} /></span>
      </button>
      <div className="card-content">
        <button className="category-tag" type="button" onClick={() => onOpen(post)}>
          {post.category}
        </button>
        <button className="card-title-button" type="button" onClick={() => onOpen(post)}>
          <h3>{post.title}</h3>
        </button>
        <p className="card-excerpt">{post.excerpt}</p>
        <div className="card-meta">
          <span>{post.date}</span>
          <i aria-hidden="true" />
          <button type="button" onClick={() => onOpen(post)}>Read more</button>
        </div>
      </div>
    </article>
  );
}
