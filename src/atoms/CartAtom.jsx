import { atom } from "recoil";

export const cartAtom = atom({
  key: "cartAtom",
  default: JSON.parse(localStorage.getItem("cartItems")) || [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newCart => {
        localStorage.setItem("cartItems", JSON.stringify(newCart));
      });
    }
  ]
});
