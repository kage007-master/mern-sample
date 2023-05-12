import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "store/nft";
import { AppDispatch, RootState } from "store";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Chip } from "@mui/material";
import Input from "components/Input";
import Loading from "components/Loading";
import "assets/css/Card.css";

interface Props {
  base: NFT;
  customized?: NFT;
  editable: boolean;
}

const MyCard: React.FC<Props> = ({ base, customized, editable }) => {
  const [word, setWord] = useState("");
  const { actionState } = useSelector((state: RootState) => state.nft);
  const dispatch = useDispatch<AppDispatch>();

  const onAdd = () => {
    if (word.trim().length) {
      dispatch(add({ word: word.trim(), base }));
      setWord("");
    }
  };

  return (
    <>
      <Card className="card">
        <CardMedia
          component="img"
          src={base.image}
          alt="green iguana"
          className="card-image"
        />
        <CardContent className="flex justify-between px-0">
          <div className="w-50">
            <p className="text-label">Name</p>
            <p className="text-value">{base.name}</p>
          </div>
          <div className="text-right w-50">
            <p className="text-label">Price</p>
            <p className="text-value">
              {customized ? customized.value : base.value}
              {" ETH"}
            </p>
          </div>
        </CardContent>
        <div className="card-info">
          {actionState && <Loading />}
          {base.info.split(" ").map((word: string, index: number) => {
            return <Chip className="chip" key={index} label={word} />;
          })}
          {customized &&
            customized.info.split(" ").map((word: string, index: number) => {
              return (
                <Chip
                  className="chip"
                  key={index}
                  label={word}
                  onDelete={() => dispatch(remove({ base, index }))}
                />
              );
            })}
          {editable && (
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWord(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.code === "Enter") onAdd();
              }}
              value={word}
              placeholder="Add your words"
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default MyCard;
