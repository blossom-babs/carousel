
const InfoBar = () => {
  return (
    <section className="bg-cozey-sky-bold " aria-label="Site information and quick links">
<div className="responsive info-bar py-2">
<ul className="flex items-center gap-2  text-[10px] md:text-xs" aria-label="Site features">
  <li>Designed in North America</li>
  <li aria-hidden="true" className="divider"></li>
  <li>Fast & Free Shipping</li>
</ul>
{/* Quick links */}

        <ul className="site-options" aria-label="Quick access">
            {
                ["Reviews", "Free Swatches", "Financing", "Support", "Contact Us", "Our Locations"].map(item => (
                    <li key={item}>
                    <a href="#" className="hover:underline">{item}</a>
                  </li>
                ))
            }
    

        </ul>



      
</div>
    </section>
  )
}

export default InfoBar