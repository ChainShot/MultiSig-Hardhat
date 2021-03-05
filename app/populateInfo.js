import MultiSig from './artifacts/contracts/MultiSig.sol/MultiSig.json';
import {address} from './__config';
import {ethers} from 'ethers';
import "./info.css";

export default async function populateInfo() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  let owners = [];
  let balance = "";
  let required = "";
  const code = await provider.getCode(address);
  if(code !== "0x") {
    const contract = new ethers.Contract(address, MultiSig.abi, provider);
    required = await contract.required();
    owners = await contract.getOwners();
    balance = await provider.getBalance(address);
  }
  document.getElementById('address').innerHTML = address;
  document.getElementById('owners').innerHTML = owners.join(", ");
  document.getElementById('balance').innerHTML = balance;
  document.getElementById('confirmations').innerHTML = required;
}
