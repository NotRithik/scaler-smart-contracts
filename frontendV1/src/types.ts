export interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

export interface Voter {
  hasVoted: boolean;
  vote: number;
}

export interface Web3State {
  provider: any;
  signer: any;
  contract: any;
  address: string;
  isAdmin: boolean;
}