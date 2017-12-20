import { Contract } from "decentraland-commons";

export const abi = [
  {
    constant: true,
    inputs: [],
    name: "duration",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "cliff",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "beneficiary",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "terraformReserve",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "returnVesting",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "vestedAmount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "releasableAmount",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "revoked",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  { constant: false, inputs: [], name: "release", outputs: [], payable: false, type: "function" },
  {
    constant: true,
    inputs: [],
    name: "revocable",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "released",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_token", type: "address" }, { name: "amount", type: "uint256" }],
    name: "releaseForeignToken",
    outputs: [],
    payable: false,
    type: "function"
  },
  { constant: false, inputs: [], name: "revoke", outputs: [], payable: false, type: "function" },
  {
    constant: true,
    inputs: [],
    name: "start",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "amount", type: "uint256" }],
    name: "lockMana",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "target", type: "address" }],
    name: "releaseTo",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "target", type: "address" }],
    name: "changeBeneficiary",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "token",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    type: "function"
  },
  {
    inputs: [
      { name: "_beneficiary", type: "address" },
      { name: "_start", type: "uint256" },
      { name: "_cliff", type: "uint256" },
      { name: "_duration", type: "uint256" },
      { name: "_revocable", type: "bool" },
      { name: "_token", type: "address" },
      { name: "_returnVesting", type: "address" },
      { name: "_terraformReserve", type: "address" }
    ],
    payable: false,
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, name: "amount", type: "uint256" }],
    name: "LockedMANA",
    type: "event"
  },
  { anonymous: false, inputs: [{ indexed: false, name: "amount", type: "uint256" }], name: "Released", type: "event" },
  { anonymous: false, inputs: [], name: "Revoked", type: "event" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "previousOwner", type: "address" },
      { indexed: true, name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  }
];

let instance = null;

class MANAVesting extends Contract {
  static getInstance() {
    if (!instance) {
      instance = new MANAVesting("MANAVesting", "0x1f5de0b904cb2b0140d4aa3a1b59481c466f91af", abi);
    }
    return instance;
  }

  async getCliff(sender) {
    return await this.call("cliff", sender);
  }
}

export default MANAVesting;