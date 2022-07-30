import { ReactElement } from "react";
import {
  useEagerConnect,
  useInactiveListener,
} from "@/connect/useEagerConnect";

const Web3ReactManager = ({
  children,
}: {
  children: ReactElement;
}): ReactElement | null => {
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  if (!triedEager) {
    return null;
  }

  return children;
};

export default Web3ReactManager;
