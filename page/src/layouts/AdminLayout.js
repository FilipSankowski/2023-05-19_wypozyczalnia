import { Link, Outlet } from "react-router-dom";


export default function AdminLayout() {
  return (
    <>
    <div className="navbarContainer">
      <div className="navbarItem">
        <Link to='/adminPage'>Update data</Link>
      </div>
      <div className="navbarItem">
        <Link to='/adminPage/productStats'>Product Stats</Link>
      </div>
      <div className="navbarItem">
        <Link to='/adminPage/customerStats'>Customer Stats</Link>
      </div>
      <div className="navbarItem">
        <Link to='/adminPage/rentalStats'>Rental Stats</Link>
      </div>
    </div>
    <Outlet />
    </>
  )
}