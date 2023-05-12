import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "components/Card";
import { AppDispatch, RootState } from "store";
import { getNfts } from "store/nft";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/material";
import Layout from "containers/Layout";
import Loading from "components/Loading/Loading";

interface Props {}

const Base: React.FC<Props> = () => {
  const { base, custom, loading } = useSelector(
    (state: RootState) => state.nft
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNfts());
  }, [dispatch]);

  return (
    <Layout>
      <Container fixed>
        {loading ? (
          <Loading />
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {base.map((nft: NFT) => {
              return (
                <Grid xs={6} sm={4} md={4} key={nft.name}>
                  <Card
                    base={nft}
                    editable={true}
                    customized={custom.find((item: NFT) => {
                      return nft.name === item.name;
                    })}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default Base;
