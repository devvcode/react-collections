import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  HeartPulse,
  House,
  Leaf,
  Plane,
  Shirt,
  Utensils
} from "lucide-react";
import Header from "./components/Header.jsx";
import BlogCard from "./components/BlogCard.jsx";
import ArticleDialog from "./components/ArticleDialog.jsx";
import Newsletter from "./components/Newsletter.jsx";
import {
  CATEGORIES,
  EDITORIAL_POSTS,
  FEATURED_STORY
} from "./data/editorialPosts.js";
import { getBlogPosts, getFallbackPosts } from "./services/postsApi.js";

const categoryIcons = {
  Lifestyle: HeartPulse,
  Travel: Plane,
  Fashion: Shirt,
  Wellness: Heart,
  "Home Decor": House,
  Recipes: Utensils
};

function CategoryList({ activeCategory, onSelect }) {
  return (
    <div className="category-list">
      {CATEGORIES.map((category) => {
        const Icon = categoryIcons[category] || Leaf;
        return (
          <button
            className={activeCategory === category ? "category-list-item active" : "category-list-item"}
            type="button"
            key={category}
            onClick={() => onSelect(category)}
          >
            <Icon size={15} strokeWidth={1.5} />
            <span>{category}</span>
            <ChevronRight size={14} strokeWidth={1.6} />
          </button>
        );
      })}
    </div>
  );
}

function AboutPanel() {
  return (
    <section className="about-panel" id="about">
      <div className="about-photo">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85"
          alt="A quiet, sunlit travel moment"
          loading="lazy"
        />
      </div>
      <div className="about-copy">
        <span className="eyebrow">About me</span>
        <h2>Hello, I’m Salma!</h2>
        <Heart className="about-heart" size={14} strokeWidth={1.4} />
        <p>
          I’m a lifestyle blogger sharing inspiration on simple living, travel,
          wellness, and creating a home you love.
        </p>
        <a className="soft-button" href="mailto:hello@sereneblog.example">
          More about me
        </a>
      </div>
    </section>
  );
}

function CategorySidebar({ activeCategory, onSelect }) {
  return (
    <aside className="category-sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <CategoryList activeCategory={activeCategory} onSelect={onSelect} />
    </aside>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2024 Serene Blog. All Rights Reserved.</span>
      <div>
        <a href="mailto:hello@sereneblog.example?subject=Privacy%20Policy">Privacy policy</a>
        <a href="mailto:hello@sereneblog.example">Contact</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [posts, setPosts] = useState(EDITORIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [feedState, setFeedState] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    getBlogPosts()
      .then((remotePosts) => {
        if (!isMounted) return;
        setPosts(remotePosts);
        setFeedState("live");
      })
      .catch(() => {
        if (!isMounted) return;
        setPosts(getFallbackPosts());
        setFeedState("local");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const searchable =
        (post.title + " " + post.excerpt + " " + post.category).toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [posts, activeCategory, searchQuery]);

  const displayedPosts = showAll ? filteredPosts : filteredPosts.slice(0, 3);

  function changeCategory(category) {
    setActiveCategory(category);
    setShowAll(false);
  }

  function scrollToAbout() {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }

  const sectionTitle = searchQuery.trim()
    ? "Search results"
    : activeCategory === "All"
      ? "Latest on the blog"
      : activeCategory + " stories";

  return (
    <div className="app-shell">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={changeCategory}
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setShowAll(false);
        }}
        onAboutClick={scrollToAbout}
      />

      <main>
        <section
          className="hero"
          aria-labelledby="hero-title"
          style={{ "--hero-image": "url(" + FEATURED_STORY.image + ")" }}
        >
          <div className="hero-inner">
            <div className="hero-card">
              <span className="hero-eyebrow">{FEATURED_STORY.eyebrow}</span>
              <h1 id="hero-title">
                {FEATURED_STORY.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p>{FEATURED_STORY.excerpt}</p>
              <button className="soft-button" type="button" onClick={() => setSelectedPost(FEATURED_STORY)}>
                Read more
              </button>
            </div>
          </div>
        </section>

        <section className="latest-section" id="latest">
          <div className="section-heading">
            <h2>{sectionTitle}</h2>
            <div className="heading-ornament"><span /><Heart size={13} /><span /></div>
          </div>

          {feedState === "loading" && (
            <p className="feed-status">Gathering a little inspiration…</p>
          )}

          {displayedPosts.length ? (
            <div className="blog-grid">
              {displayedPosts.map((post) => (
                <BlogCard key={post.id} post={post} onOpen={setSelectedPost} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state-heart">♡</span>
              <h3>No stories found just yet</h3>
              <p>Try another search or browse all of our categories.</p>
              <button className="text-back-button" type="button" onClick={() => {
                setSearchQuery("");
                changeCategory("All");
              }}>
                Clear filters <ArrowRight size={15} />
              </button>
            </div>
          )}

          {filteredPosts.length > 3 && (
            <button className="view-all-button" type="button" onClick={() => setShowAll((value) => !value)}>
              {showAll ? "Show fewer stories" : "Explore all stories"}
              <ArrowRight size={15} />
            </button>
          )}
        </section>

        <section className="lower-content">
          <AboutPanel />
          <CategorySidebar activeCategory={activeCategory} onSelect={changeCategory} />
        </section>

        <Newsletter />
      </main>

      <Footer />
      <ArticleDialog post={selectedPost} onClose={() => setSelectedPost(null)} />
      <span className="sr-only" aria-live="polite">
        {feedState === "live" ? "Demo posts loaded from DummyJSON." : ""}
        {feedState === "local" ? "Showing the local demo stories." : ""}
      </span>
    </div>
  );
}
