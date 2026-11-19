import { useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { CATEGORIES } from "../data/editorialPosts.js";

// Lucide contains interface icons, not social-network brand marks.
// Keep these tiny brand-style marks local so the build does not depend on
// exports that are not present in lucide-react.
function SocialMark({ name }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="social-mark-fill" cx="17.7" cy="6.6" r="1" />
      </svg>
    );
  }

  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="facebook-mark">
        <path d="M14.1 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8v3.1h2.7v8h3.4Z" />
      </svg>
    );
  }

  if (name === "Twitter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="twitter-mark">
        <path d="M21.2 6.1c-.7.3-1.4.5-2.2.6a3.7 3.7 0 0 0 1.7-2.1 7.4 7.4 0 0 1-2.4.9 3.7 3.7 0 0 0-6.4 2.5c0 .3 0 .6.1.9a10.5 10.5 0 0 1-7.6-3.9 3.7 3.7 0 0 0 1.1 5 3.7 3.7 0 0 1-1.7-.5v.1c0 1.8 1.3 3.3 3 3.7-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.6 2.6a7.5 7.5 0 0 1-4.6 1.6H3.2a10.6 10.6 0 0 0 5.7 1.7c6.8 0 10.5-5.6 10.5-10.5v-.5c.7-.6 1.3-1.3 1.8-2.1Z" />
      </svg>
    );
  }

  return null;
}

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Pinterest", mark: "p", href: "https://www.pinterest.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "Twitter", href: "https://twitter.com/" }
];

export default function Header({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onAboutClick
}) {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function selectCategory(category) {
    onCategoryChange(category);
    setCategoryMenuOpen(false);
    setMobileMenuOpen(false);
    document.getElementById("latest")?.scrollIntoView({ behavior: "smooth" });
  }

  function clearSearch() {
    onSearchChange("");
    setSearchOpen(false);
  }

  return (
    <header className="site-header" id="home">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="top-links">
            <a href="#home" onClick={() => onCategoryChange("All")}>Home</a>
            <button type="button" onClick={onAboutClick}>About</button>
            <div className="top-category-wrap">
              <button
                type="button"
                className={categoryMenuOpen ? "top-category active" : "top-category"}
                onClick={() => setCategoryMenuOpen((open) => !open)}
                aria-expanded={categoryMenuOpen}
              >
                Categories <ChevronDown size={13} strokeWidth={1.8} />
              </button>
              {categoryMenuOpen && (
                <div className="category-dropdown">
                  <button type="button" onClick={() => selectCategory("All")}>All stories</button>
                  {CATEGORIES.map((category) => (
                    <button type="button" key={category} onClick={() => selectCategory(category)}>
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="social-links" aria-label="Social media">
            {socialLinks.map(({ label, mark, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                {mark ? (
                  <span className="pinterest-mark">{mark}</span>
                ) : (
                  <SocialMark name={label} />
                )}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="search-toggle"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
          >
            <span>Search</span>
            {searchOpen ? <X size={16} /> : <Search size={16} />}
          </button>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {categoryMenuOpen && (
          <div className="mobile-category-panel">
            <button type="button" onClick={() => selectCategory("All")}>All stories</button>
            {CATEGORIES.map((category) => (
              <button type="button" key={category} onClick={() => selectCategory(category)}>
                {category}
              </button>
            ))}
          </div>
        )}

        {searchOpen && (
          <div className="search-panel">
            <div className="search-panel-inner">
              <Search size={18} strokeWidth={1.6} />
              <input
                autoFocus
                type="search"
                placeholder="Search stories, places and little things..."
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
              />
              {searchQuery && (
                <button type="button" onClick={clearSearch} aria-label="Clear search">
                  <X size={17} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="brand-area">
        <a className="brand-lockup" href="#home" aria-label="Serene home">
          <span className="brand-script">Serene</span>
          <span className="brand-sprig" aria-hidden="true">
            <svg viewBox="0 0 66 58" role="presentation">
              <path d="M15 49C27 37 35 22 46 5" />
              <path d="M29 31C18 28 13 21 13 13C24 14 30 20 29 31Z" />
              <path d="M37 20C35 10 39 5 47 2C49 12 45 18 37 20Z" />
              <path d="M20 42C12 37 6 38 2 44C10 49 16 48 20 42Z" />
              <path d="M43 11C51 11 56 7 58 1C49 -1 44 3 43 11Z" />
            </svg>
          </span>
          <span className="brand-subtitle">Beautiful life &amp; style blog</span>
        </a>
      </div>

      <nav className={mobileMenuOpen ? "category-nav mobile-open" : "category-nav"} aria-label="Blog categories">
        {CATEGORIES.map((category) => (
          <button
            type="button"
            key={category}
            className={activeCategory === category ? "selected" : ""}
            onClick={() => selectCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </header>
  );
}
