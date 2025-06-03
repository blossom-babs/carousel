
const InfoBar = () => {
  return (
    <section className="bg-cozey-sky-bold ">
<div className="responsive info-bar py-2">
        <div className="flex items-center gap-2 text-[10px] md:text-xs">
            <p>Designed in North America</p>
            <div className="divider"></div>
            <p>Fast & Free Shipping</p>
        </div>

        <ul>
            {
                ["Reviews", "Free Swatches", "Financing", "Support", "Contact Us", "Our Locations"].map(item => (
                    <li key={item}>{item}</li>
                ))
            }
      

        </ul>



      
</div>
    </section>
  )
}

export default InfoBar