//Styling
import "./App.css";
//Components
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import React, { Component } from "react";
import Particles from "react-particles-js";

import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
//Signup
import Signin from "./Components/Signin/signin";
import Registor from "./Components/Signin/Registor";

const particleOptions = {
  particles: {
    number: {
      value: 215,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    line_linked: {
      enable_auto: true,
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  updateUserInfo = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  //check connection
  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //     .then((resp) => resp.json())
  //     .then(console.log);
  // }

  calculateFaceLocation = (data) => {
    const clarifyFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - clarifyFace.right_col * width,
      bottomRow: height - clarifyFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onSubmit = () => {
    console.log("click");
    this.setState({ imageUrl: this.state.input });
    fetch("https://serene-wave-57385.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          fetch("https://serene-wave-57385.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
          //Always have a catch after using fetch
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="Particles" params={particleOptions} />

        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} count={this.state.user.entries} />
            <ImageLinkForm
              submit={this.onSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin
            onRouteChange={this.onRouteChange}
            updateUserInfo={this.updateUserInfo}
          />
        ) : (
          <Registor
            onRouteChange={this.onRouteChange}
            updateUserInfo={this.updateUserInfo}
          />
        )}
      </div>
    );
  }
}

export default App;
