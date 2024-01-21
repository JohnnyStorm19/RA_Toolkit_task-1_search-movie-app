import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-5 py-3 shadow-md bg-slate-500 text-white">
        <h2>Movies searching app</h2>
        <div>
            <Link to='/' className="mr-5">Main page</Link>
            <Link to='/favourites'>Favourite movies</Link>
        </div>
    </nav>
  )
}

export default Navbar
