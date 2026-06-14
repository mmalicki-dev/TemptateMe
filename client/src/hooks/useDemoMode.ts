import useAuth from "./useAuth.ts";

const DEMO_EMAIL = import.meta.env.VITE_DEMO_USER_EMAIL as string | undefined;

const useDemoMode = () => {
  const { user } = useAuth();
  return Boolean(DEMO_EMAIL && user?.email === DEMO_EMAIL);
};

export default useDemoMode;
