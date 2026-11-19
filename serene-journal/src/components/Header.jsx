import { useState } from "react";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Menu,
  Search,
  Twitter,
  X
} from "lucide-react";
import { CATEGORIES } from "../data/editorialPosts.js";

const socialLinks = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
  { label: "Pinterest", icon: null, mark: "p", href: "https://www.pinterest.com/" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com/" }
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
            {socialLinks.map(({ label, icon: Icon, mark, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                {Icon ? <Icon size={15} strokeWidth={2} /> : <span className="pinterest-mark">{mark}</span>}
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
