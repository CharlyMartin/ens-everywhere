import React from "react";
import { ethers } from "ethers";

export function useMetaMask() {
  const [error, setError] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [eth, setEth] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window != "undefined") {
      // @ts-ignore
      setEth(window.ethereum);
    }
  }, []);

  React.useEffect(() => {
    if (window && eth) {
      eth.on("accountsChanged", (res: string[]) => accountsChanged(res[0]));
      eth.on("chainChanged", chainChanged);
    }
  }, [eth]);

  // Persist acount accross page refresh
  React.useEffect(() => {
    if (!window) return;

    if (account) {
      localStorage.setItem("account", account);
    }

    if (!account) {
      const acc = localStorage.getItem("account");
      if (acc) setAccount(acc);
    }

    return () => {
      localStorage.removeItem("account");
    };
  }, [account]);

  return { account, balance, connectHandler, error };

  async function connectHandler() {
    if (eth) {
      try {
        const res = await eth.request({
          method: "eth_requestAccounts",
        });
        console.info(res);
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setError("There was a problem connecting to MetaMask");
      }
    } else {
      setError("Install MetaMask and try again");
    }
  }

  async function accountsChanged(newAccount: string) {
    setAccount(newAccount);
    try {
      const balance = await eth.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setError("There was a problem connecting to MetaMask");
    }
  }

  function chainChanged() {
    setError("");
    setAccount("");
    setBalance("");
  }
}
