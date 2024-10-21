import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const BookmarkBorderIcon = () => <p>BookMark</p>
const BookmarkIcon = () => <p>Selected</p>

export default function IconCheckboxes() {
    return (
        <div>
            <Checkbox
                {...label}
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
            />
        </div>
    );
}