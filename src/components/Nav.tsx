const Nav = () => {
  return (
    <nav className="bg-fog-soft nav">
        <div className="responsive flex justify-between">
      <div>
        <img src="/assets/Logo.svg" alt="Cozey" />
      </div>
      <ul>
        {[
          "Seating",
          "Table",
          "Storage",
          "Accessories",
          "Washable Rugs",
          "Outdoor",
        ].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <img src="/assets/cart.svg" alt="Shopping Cart" />
      </div>
    </nav>
  );
};

export default Nav;
