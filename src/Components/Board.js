import React, { useState } from 'react';
import {
    DndContext,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { List } from './List';

const data = [
    {
        id: "task1",
        title: "task1",
        columnId: "todo",
    },
    {
        id: "task2",
        title: "task2",
        columnId: "in-progress",
    },
    {
        id: "task3",
        title: "task3",
        columnId: "done",
    },
    {
        id: "task4",
        title: "task2",
        columnId: "in-progress",
    },
    {
        id: "task5",
        title: "task3",
        columnId: "done",
    },
];

const initialList = [
    {
        id: "todo",
        title: "Todo",
    },
    {
        id: "in-progress",
        title: "In progress",
    },
    {
        id: "done",
        title: "Done",
    },
];

function Board() {
    const [lists, setLists] = useState(initialList);
    const [card, setCards] = useState(data);
    const [value, setValue] = useState('');

    function onDragOver(event) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setCards((prev) => {
            const activeIndex = prev.findIndex((item) => item.id === active.id);
            const overIndex = prev.findIndex((item) => item.id === over.id);
            const activeTask = prev[activeIndex];
            const overTask = prev[overIndex];
            if (
                activeTask &&
                overTask &&
                activeTask.columnId !== overTask.columnId
            ) {
                activeTask.columnId = overTask.columnId;
                const retValue = arrayMove(prev, activeIndex, overIndex - 1);
                return retValue;
            }
        });
    }

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    const handleAddListClick = () => {
        if (value !== '') {
            setLists(prev => [...prev, {
                id: value,
                title: value,
            }])
        }
    }

    const handleAddCard = (card) => {
        setCards(prev => [...prev, card]);
    }

    return (
        <DndContext
            onDragOver={onDragOver}
        >
            <div className="boardContainer">
                {lists.map((col) => (
                    <List
                        key={col.id}
                        column={col}
                        tasks={card?.filter((task) => task.columnId === col.id)}
                        id={col.id}
                        name={col.title}
                        onAddBtnClick={handleAddCard}
                    />
                ))}
                <div>
                    <input type='text' placeholder='Create a List' value={value} onChange={handleInputChange} />
                    <button onClick={handleAddListClick}>Create a list</button>
                </div>
            </div>
        </DndContext>
    )
}

export default Board