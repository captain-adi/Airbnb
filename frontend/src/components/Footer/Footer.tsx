

function Footer() {
  return (
     <footer className=" border-t mt-10 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-muted-foreground">
        
        {/* Column 1 */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">AirCover</a></li>
            <li><a href="#">Anti-discrimination</a></li>
            <li><a href="#">Disability support</a></li>
            <li><a href="#">Cancellation options</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3">Community</h3>
          <ul className="space-y-2">
            <li><a href="#">Airbnb.org: disaster relief housing</a></li>
            <li><a href="#">Combating discrimination</a></li>
            <li><a href="#">Refugee housing</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3">Hosting</h3>
          <ul className="space-y-2">
            <li><a href="#">Airbnb your home</a></li>
            <li><a href="#">AirCover for Hosts</a></li>
            <li><a href="#">Hosting resources</a></li>
            <li><a href="#">Community forum</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-3">About</h3>
          <ul className="space-y-2">
            <li><a href="#">Newsroom</a></li>
            <li><a href="#">Learn about new features</a></li>
            <li><a href="#">Letter from founders</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t dark:bg-gray-700 ">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 Airbnb, Inc. · Privacy · Terms · Sitemap</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <button className="flex items-center gap-1">
              🌐 English (IN)
            </button>
            <button>₹ INR</button>
            <div className="flex gap-3">
              <a href="#">📘</a>
              <a href="#">🐦</a>
              <a href="#">📸</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
