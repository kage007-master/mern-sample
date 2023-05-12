interface NFT {
  name: string;
  image: string;
  value: number;
  info: string;
}

interface NFTState {
  base: NFT[];
  custom: NFT[];
  loading: boolean;
  actionState: boolean;
}

interface AddData {
  base: NFT;
  word: string;
}

interface RemoveData {
  base: NFT;
  index: number;
}
