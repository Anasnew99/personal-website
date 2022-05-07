import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";

const useHash = (): { hash: string; setHash: (newHash: string) => any } => {
  const router = useRouter();
  const [hasher, setHasher] = useState("");

  useEffect(() => {
    setHasher(router.asPath.split("#")[1] || "");
  }, [router.asPath]);

  const setHash = useCallback(
    (newHash: string) => {
      const path = router.asPath.replace(/\#.*/, "");
      router.push(`${path}#${newHash}`);
    },
    [router]
  );
  return { hash: hasher, setHash };
};

export default useHash;
