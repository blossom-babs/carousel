
const CallToAction = () => {
  return (
    <section className=' bg-cozey-sky-bold  campton'>
        <div className='responsive py-12 flex justify-between items-center cta'>
        <p className='text-fog-soft max-w-[480px] text-2xl font-medium'>Join the Cozey Family to stay ahead on product launches and exclusive content.</p>

        <div className='bg-fog-soft rounded-[52px] w-[80%] flex items-center  py-4 max-w-[700px]'>
            <div className="w-[95%] mx-auto flex justify-between">
            <input className='text-midnight-balanced text-lg-semi active:outline-transparent focus:outline-transparent' type="email" placeholder='Email'/>
            <button className='bg-midnight-bold rounded-[29px] text-fog-soft py-4 px-8 text-lg-semi'>Sign up</button>
            </div>
        </div>
        </div>
    </section>
  )
}

export default CallToAction