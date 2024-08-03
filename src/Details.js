import BreadCrumb from "./BreadCrumb";

const Details = () => (
    <>
        <div>Details Page</div>
        <BreadCrumb
            pages={[
                { name: 'Home', url: '/' },
                { name: 'Listing', url: '/listing' },
                { name: 'Details', url: '/listing/details' },
            ]}
        />
    </>
);

export default Details;