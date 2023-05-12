import React from "react";
import { Container } from "@mui/material";
import Layout from "containers/Layout";
import "assets/css/Home.css";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Layout>
      <Container fixed className="flex home">
        <div className="half">
          <h1 className="title">
            Create, Sell & Collect Your Own Creative NFT
          </h1>
          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit.
          </p>
        </div>
        <img src="home.png" className="half" alt="home" />
      </Container>
    </Layout>
  );
};

export default Home;
