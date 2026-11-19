import { useEffect } from "react";
import { ArrowLeft, Clock, X } from "lucide-react";

export default function ArticleDialog({ post, onClose }) {
  useEffect(() => {
    if (!post) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="article-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close article">
          <X size={20} />
        </button>
        <img className="dialog-cover" src={post.image} alt="" />
        <div className="dialog-body">
          <span className="eyebrow">{post.category}</span>
          <h2 id="article-dialog-title">{post.title}</h2>
          <div className="dialog-meta">
            <span>{post.date}</span>
            <span><Clock size={13} /> {post.readTime}</span>
          </div>
          <p className="dialog-lead">{post.excerpt}</p>
          {(post.body || "").split(/\n\n+/).filter(Boolean).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <button className="text-back-button" type="button" onClick={onClose}>
            <ArrowLeft size={15} /> Back to the journal
          </button>
        </div>
      </article>
    </div>
  );
}
