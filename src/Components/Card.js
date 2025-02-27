import { useSortable } from "@dnd-kit/sortable";

export function TaskCard({ task, title }) {
    const {
        setNodeRef,
        listeners,
    } = useSortable({
        id: task.id,
        data: {
            type: "Card",
            task,
        },
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
        >
            {title}
        </div>
    );
}