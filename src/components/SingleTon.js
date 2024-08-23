import React, { useEffect, useState } from 'react';

/*
3. No Component Is a Singleton
    - Don't assume a component will only ever be displayed once, such as a navigation bar. This assumption can lead to design problems later on.

    -  Problems can arise when components are duplicated, like needing an animation between two Page components. If both assume they're the only one on the screen, it can cause errors.
*/

/* This example assumes that the Page component will only ever be rendered once. It resets a form in the global state whenever it mounts, which can lead to problems if more than one Page component is rendered. */

// This action resets a form in the global state (e.g., Redux store)
function resetForm() {
    console.log('Form reset');
}

function Page() {
    useEffect(() => {
        // Reset form when the component mounts
        resetForm();
    }, []);

    return <div>Page Content</div>;
}

/* In this improved example, we modify the Page component to avoid assuming it's the only instance. We can use local component state or context to manage instance-specific data, rather than directly manipulating global state in a way that could interfere with other instances. */
function resetFormV2(id) {
    console.log(`Formv2 ${id} reset`);
}

function PageV2({ id }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Reset form for this specific instance when the component mounts
        resetFormV2(id);
    }, [id]);

    return (
        <div>
            <h2>Page {id}</h2>
            <p>Form data: {JSON.stringify(formData)}</p>
        </div>
    );
}

function SingleTon() {
    return (
        <>
            <Page />
            <Page />
            <PageV2 id="1" />
            <PageV2 id="2" />
        </>
    )
}

export default SingleTon