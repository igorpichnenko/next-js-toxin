import MainLayout, { MainLayoutProps } from 'layouts/MainLayout';
import Container from 'components/Container/Container';
import classes from './authLayout.module.scss';

const AuthLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Авторизация',
  description = 'Авторизация',
}) => (
  <MainLayout title={title} description={description}>
    <div className={classes.main}>
      <Container>
        <div className={classes.wrap}>{children}</div>
      </Container>
    </div>
  </MainLayout>
);
export default AuthLayout;
