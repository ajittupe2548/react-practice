import { Link, useLocation } from "react-router-dom";

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

const BreadCrumb = ({ pages }) => {
    return (
        <ul className='breadcrumbContainer'>
            {pages.map((item, index) => {
                return (
                    <li
                        key={index}
                        style={{ marginLeft: index !== 0 ? 4 : 0 }}
                        className='breadcrumbItem'
                    >
                        <Link to={item.url} className='link'>
                            {item.name}
                        </Link>
                        {index !== pages.length - 1 && (
                            <ChevronRightIcon className='icon' />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const BreadCrumbV2 = ({ pages }) => {
    const { pathname } = useLocation();
    const formattedPath = pathname.split('/').filter(item => item);
    return (
        <ul className='breadcrumbContainer'>
            {
                formattedPath.length > 0 && (
                    <li className="breadcrumbItem">
                        <Link to='/' className="link">Home</Link>
                    </li>
                )
            }
            {
                formattedPath.map((item, index) => {
                    return (
                        <li key={index} className="breadcrumbItem">
                            <ChevronRightIcon className='icon' />
                            {index !== formattedPath.length - 1 ? (
                                <>
                                    <Link to={item} className='link'>
                                        {item}
                                    </Link>
                                </>
                            ) : <p className="lastBreadcrumbItem">{item}</p>}
                        </li>

                    )
                })
            }
        </ul>
    );
};

export default BreadCrumbV2;