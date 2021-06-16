import Head from 'next/head';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import SvgSprite from 'components/SvgSprite/SvgSprite';

type MainLayoutProps = {
  children: any;
  title: string;
  description: string;
  keyWords?: string;
  withFooterBorder?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'toxin',
  description = 'Hotel',
  keyWords = 'Search Hotel, rooms',
  withFooterBorder = false,
}) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyWords} />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <title>{title} | Toxin</title>
    </Head>
    <div className="wrapper">
      <div className="content">
        <Header />
        <main>{children}</main>
      </div>
      <Footer withBorderTop={withFooterBorder} />
    </div>

    <SvgSprite />
  </>
);
export type { MainLayoutProps };

export default MainLayout;
