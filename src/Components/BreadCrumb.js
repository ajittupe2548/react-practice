/* 1h 20m */
import { Link, useLocation } from 'react-router-dom';
import styles from './BreadCrumb.module.css';

const ChevronRightIcon = ({ className }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 320 512'
            className={className}
        >
            <path d='M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z' />
        </svg>
    );
};

const BreadCrumb = () => {
    const { pathname } = useLocation();
    const formattedPath = pathname.split('/').filter((item) => item);
    return (
        <ul className={styles.container}>
            {formattedPath.length > 0 && (
                <li className={styles.item}>
                    <Link to='/' className={styles.link}>
                        Home
                    </Link>
                </li>
            )}
            {formattedPath.map((item, index) => {
                return (
                    <li key={index} className={styles.item}>
                        <ChevronRightIcon className={styles.icon} />
                        {index !== formattedPath.length - 1 ? (
                            <Link to={item} className={styles.link}>
                                {item}
                            </Link>
                        ) : (
                            <p>{item}</p>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default BreadCrumb;
