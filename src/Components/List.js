import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { TaskCard } from "./Card";

export function List({ tasks, name, id, onAddBtnClick }) {
    const [value, setValue] = useState('');
    const tasksIds = useMemo(() => {
        return tasks?.map((task) => task.id);
    }, [tasks]);

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    const handleAddCard = () => {
        const newCard = {
            id: Date.now(),
            title: value,
            columnId: id,
        };

        onAddBtnClick(newCard);
    }

    return (
        <div
            className='listContainer'
        >
            <div className="listName">
                <p>{name}</p>
                <div>
                    <input type="text" value={value} onChange={handleInputChange} className="cardInput" placeholder="Add Card" />
                    <button onClick={handleAddCard}>Add</button>
                </div>
            </div>

            <SortableContext items={tasksIds}>
                {tasks?.map((task) => (
                    <TaskCard key={task.id} task={task} title={task.title} />
                ))}
            </SortableContext>
        </div>
    );
}
