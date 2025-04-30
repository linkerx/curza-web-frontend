import React from "react";
import HomeDestacadas from "./destacadas";
import HomeHeader from "./header";
import Notificacion from "./notificacion";
import "./styles.scss";

class HomeInicio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showScrollProp: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 200) {
      this.setState({
        showScrollProp: false,
      });
    } else {
      this.setState({
        showScrollProp: true,
      });
    }
  }
  render() {
    return (
      <section id="home-inicio">
        <div className="fondo"></div>
        <Notificacion />
        <HomeDestacadas />
        <div id="scroll-proposal">
          {this.state.showScrollProp && (
            <i
              className="fas fa-chevron-down"
              onClick={() => {
                window.scrollTo({ top: 200, behavior: "smooth" });
              }}
            ></i>
          )}
        </div>
      </section>
    );
  }
}

export default HomeInicio;
