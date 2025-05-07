import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar() {
    return (<nav className="navbar">
        {/* הלוגו בראש העמוד */}
        <div className="logo">
            <img src="src/img/logo.png" alt="לוגו הארגון" />
        </div>
        {/* הקישורים */}
        <ul>
            <li> <Link to="Donations">Donations</Link></li>
            <li><Link to="ToDonate">ToDonate</Link></li>
        </ul>
    </nav>
    )
}