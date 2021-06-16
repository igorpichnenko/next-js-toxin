import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface IRedirectPropTypes {
  to: string;
}

const Redirect = ({ to }: IRedirectPropTypes) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to, undefined, { shallow: true });
  }, [to]);
  return null;
};

export default Redirect;
