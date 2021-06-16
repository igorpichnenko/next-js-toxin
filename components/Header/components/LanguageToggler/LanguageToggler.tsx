import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classes from './languageToggler.module.scss';

type LGPropsTypes = {
  items: string[];
};

const LanguageToggler = ({ items }: LGPropsTypes) => {
  const [visible, setVisible] = useState(false);
  const clsWrapper = [classes.wrapper, visible ? classes.isActive : null].join(' ');

  const router = useRouter();
  const { locale = 'ru' } = router;

  const [currentLang, setCurrentLang] = useState(locale);
  useEffect(() => {
    setCurrentLang(locale);
  }, [locale]);

  const handlerWrapperClick = () => {
    setVisible(!visible);
  };

  const handlerClickItem = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!visible) return;
    const { currentTarget } = e;
    const { lang = 'ru' } = currentTarget.dataset;
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  const handlerClickOutside = (e: MouseEvent) => {
    const wrapper = (e.target as HTMLDivElement).closest(`.${clsWrapper}`);
    if (wrapper) return;
    setVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handlerClickOutside);
    return () => {
      document.removeEventListener('click', handlerClickOutside);
    };
  }, []);

  return (
    <div className={clsWrapper} onClick={handlerWrapperClick}>
      <span className={classes.title}>{currentLang}</span>
      <div className={classes.select}>
        {items.map((item, index) => (
          <span className={classes.item} key={index} data-lang={item} onClick={handlerClickItem}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export type { LGPropsTypes };

export default LanguageToggler;
