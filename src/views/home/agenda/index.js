import React from "react";
import WpNetworkSchedule from "wp/network/schedule";
import "./styles.scss";

class HomeAgenda extends React.Component {
  render() {
    return (
      <section id="home-agenda">
        <div className="centrado">
          <h1>PRÓXIMOS EVENTOS</h1>
          {this.renderSchedule()}
        </div>
      </section>
    );
  }

  renderSchedule() {
    try {
      return (
        <WpNetworkSchedule
          count="5"
          layout="image-first"
          imageRender="img"
          template={3}
        />
      );
    } catch (error) {
      console.error("Error rendering WpNetworkSchedule:", error);
      return (
        <div className="error-message">No se pudieron cargar los eventos</div>
      );
    }
  }
}

export default HomeAgenda;
