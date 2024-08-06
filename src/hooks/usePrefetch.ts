import { useRouter } from "next/navigation";

const usePrefetch = () => {
  const router = useRouter();

  const prefetchPage = (path: string) => {
    router.prefetch(path);
  }

  return prefetchPage;
}

export default usePrefetch;