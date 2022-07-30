/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { isMobile } from "web3modal";
import { connectorLocalStorageKey, injected } from "./connectors";
import { getStore } from "@/utils/storage";

export const useEagerConnect = (): boolean => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      const hasSignedIn = getStore(connectorLocalStorageKey);
      if (isAuthorized && hasSignedIn) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else if (isMobile() && window.ethereum && hasSignedIn) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
};

export function useInactiveListener(suppress = false): void {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch((e) => {
          console.error("Failed to activate after chain changed", e);
        });
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((e: Error) => {
            console.error("Failed to activate after accounts changed", e);
          });
        }
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
}
