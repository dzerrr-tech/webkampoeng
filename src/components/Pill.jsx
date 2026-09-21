import { pillClass } from '../data.js';

export default function Pill({ status }){
  return <span className={"pill " + pillClass(status)}>{status}</span>;
}
