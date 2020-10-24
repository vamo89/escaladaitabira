import React from "react";
import { Link } from "gatsby";
import logo from "../img/logo.svg";
import "./footer.sass";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content level">
          <section className="level-item menu">
            <ul className="menu-list">
              {[
                { to: "/", name: "Início" },
                { to: "/rampa", name: "Rampa" },
                { to: "/candidopolis", name: "Candidópolis" },
                { to: "/contact", name: "Contato" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="navbar-item">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  className="navbar-item"
                  href="/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin
                </a>
              </li>
            </ul>
          </section>
          <div className="level level-item ">
            <img
              src={logo}
              alt="Escalada Itabira"
              className="level-item has-text-centered"
            />
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
