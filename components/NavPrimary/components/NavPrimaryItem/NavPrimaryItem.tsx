import Link from 'next/link';

import classes from './navPrimaryItem.module.scss';

interface NavPrimaryItemPropsTypes {
  dropdownLinks?: { href: string; text: string }[];
  text: string;
  href: string;
}

function NavPrimaryItem({ dropdownLinks, text, href }: NavPrimaryItemPropsTypes) {
  const linkStyle = [classes.link, dropdownLinks ? classes.linkDropdown : ''].join(' ');

  function clickLinkHandler(e: React.MouseEvent<HTMLElement>) {
    if (!dropdownLinks) return;

    e.preventDefault();
  }

  return (
    <li className={classes.listItem}>
      <Link href={href} shallow={true}>
        <a className={linkStyle} onClick={clickLinkHandler}>
          {text}
        </a>
      </Link>
      {!dropdownLinks ? null : (
        <ul className={classes.dropdownList}>
          {dropdownLinks.map((linkData, index) => (
            <li className={classes.listItem} key={index}>
              <Link href={linkData.href} shallow={true}>
                <a className={classes.link}>{linkData.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavPrimaryItem;
export type { NavPrimaryItemPropsTypes };
