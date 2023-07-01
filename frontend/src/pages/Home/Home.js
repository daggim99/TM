import React from "react";
import { AiOutlineReconciliation } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/minoft.jpg";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <AiOutlineReconciliation size={65} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Have an Account?</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Trade License Management Solution</h2>
          <p>
            Trade License Management System for Akaki Kality sub-city Trade and
            Market Development Office
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="TMS" />
        </div>
      </section>
    </div>
  );
};

export default Home;
