import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "components/Card";
import { AppDispatch, RootState } from "store";
import { getNfts } from "store/nft";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/material";
import Layout from "containers/Layout";
import Loading from "components/Loading/Loading";
import Chart from "react-apexcharts";

var data = {
  series: [
    {
      name: "Base",
      data: [],
    },
    {
      name: "Custom",
      data: [0],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Comparsion between base and custom nfts",
      style: {
        color: "#ffffff",
      },
    },
    legend: {
      labels: {
        colors: "#ffffff",
      },
    },
    xaxis: {
      categories: [""],
      labels: {
        style: {
          colors: ["#ffffff"],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#ffffff"],
        },
      },
    },
  },
};

interface Props {}

const Custom: React.FC<Props> = () => {
  const { custom, base, loading } = useSelector(
    (state: RootState) => state.nft
  );
  const dispatch = useDispatch<AppDispatch>();

  const getData = () => {
    data.options.xaxis.categories = [];
    data.options.xaxis.labels.style.colors = [];
    data.series[0].data = [];
    data.series[1].data = [];
    base.forEach((item: NFT) => {
      data.options.xaxis.categories.push(item.name);
      data.options.xaxis.labels.style.colors.push("#ffffff");
      data.series[0].data.push(item.value);
      const res = custom.find((nft: NFT) => {
        return nft.name === item.name;
      });
      data.series[1].data.push(res ? res.value : item.value);
    });
    return data;
  };

  useEffect(() => {
    dispatch(getNfts());
  }, [dispatch]);

  return (
    <Layout>
      <Container fixed>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Chart
              options={getData().options}
              series={getData().series}
              type="bar"
              height={350}
            />
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {custom.map((nft: NFT) => {
                return (
                  <Grid xs={6} sm={4} md={4} key={nft.name}>
                    <Card key={nft.name} base={nft} editable={false} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Custom;
