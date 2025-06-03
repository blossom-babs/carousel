const Nav = () => {
  return (
    <nav className="bg-fog-soft nav"  aria-label="Main navigation">
        <div className="responsive flex justify-between">
      <div>
        <a href="/" aria-label="Go to homepage" className="inline-block">
          <img src="/assets/Logo.svg" alt="Cozey logo" />
        </a>
      </div>
      {/* Navigation links */}
      <ul role="menubar">
        {[
          "Seating",
          "Table",
          "Storage",
          "Accessories",
          "Washable Rugs",
          "Outdoor",
        ].map((item) => (
          <li key={item} role="none">
          <a
            href="#"
            role="menuitem"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-cozey-sky-bold rounded-sm"
          >
            {item}
          </a>
        </li>
        ))}
      </ul>
      <a href="#" aria-label="View shopping cart" className="inline-block">
          <img src="/assets/cart.svg" alt="Shopping cart" />
        </a>      </div>
    </nav>
  );
};

export default Nav;
