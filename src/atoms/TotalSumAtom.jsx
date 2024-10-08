import { atom, useRecoilValue } from "recoil";
import { spiceAtom } from "../assets/spices";
import { cartAtom } from "../atoms/CartAtom";


export const TotalSumAtom = atom({
    key: "TotalSumAtom",
    default: JSON.parse(localStorage.getItem("TotalSum")) || [],
    effects_UNSTABLE: [
      ({ onSet }) => {
        onSet(sum => {
          localStorage.setItem("TotalSum", JSON.stringify(sum));
        });
      }
    ]
  });
  