import MainLayout from 'layouts/MainLayout';
import classes from './404.module.scss';

const Custom404 = () => (<MainLayout title={'custom 404'} description={'custom 404'}>
         <h1 className={classes.error}>404 - Page Not Found</h1>
        </MainLayout>
);

export default Custom404;
