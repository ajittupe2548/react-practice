import React, { useRef, useState } from 'react';
import styles from './FileExplorer.module.css';

const Folder = ({ data, addFolder, addFile }) => {
    const [shouldExpand, setShouldExpand] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const isFolderRef = useRef(false);

    const handleFolderWrapperClick = (e) => {
        e.stopPropagation();
        setShouldExpand(!shouldExpand);
    };

    const handleInputBlur = (e) => {
        setShowInput(false);

        if (e.target.value) {
            isFolderRef.current
                ? addFolder(data.id, e.target.value)
                : addFile(data.id, e.target.value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            isFolderRef.current
                ? addFolder(data.id, e.target.value)
                : addFile(data.id, e.target.value);
            setShowInput(false);
        }
    };

    const handleAddFolderClick = (e) => {
        e.stopPropagation();
        isFolderRef.current = true;
        setShouldExpand(true);
        setShowInput(true);
    };

    const handleAddFileClick = (e) => {
        e.stopPropagation();
        isFolderRef.current = false;
        setShouldExpand(true);
        setShowInput(true);
    };

    return (
        <div
            className={styles.folderContainer}
            style={{ marginLeft: data.name === 'root' ? 0 : null }}
            data-id={data.id}
        >
            <div
                className={styles.folder}
                onClick={handleFolderWrapperClick}
                data-open={false}
            >
                <div className={styles.folderName}>📁 {data.name} </div>
                <div className={styles.btnWrapper}>
                    <span className={styles.folderBtn} onClick={handleAddFolderClick}>
                        Folder+
                    </span>
                    <span className={styles.fileBtn} onClick={handleAddFileClick}>
                        File+
                    </span>
                </div>
            </div>
            {showInput && (
                <input
                    type='text'
                    className={styles.input}
                    onKeyDown={handleKeyDown}
                    onBlur={handleInputBlur}
                    autoFocus
                />
            )}
            <div
                className={styles.children}
                style={{ height: shouldExpand ? '100%' : 0 }}
            >
                {data?.folderList?.map((item, index) => {
                    return (
                        <Folder
                            key={index}
                            data={item}
                            addFolder={addFolder}
                            addFile={addFile}
                        />
                    );
                })}
                {data.hasInput ? <input type='text' /> : null}
                {data?.fileList?.map((item, idx) => {
                    return (
                        <p key={idx} style={{ marginLeft: 20 }}>
                            📃 {item}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

function FileExplorer({ fileExplorerData }) {
    const [fileData, setFileData] = useState(fileExplorerData);

    const addFolder = (data, folderId, newName) => {
        if (data.id === folderId) {
            data?.folderList?.unshift({
                name: newName,
                id: parseInt(Math.random() * 1000),
                fileList: [],
                folderList: [],
            });

            return data;
        }

        let newFolderList;

        newFolderList = data?.folderList?.map((folder) => {
            return addFolder(folder, folderId, newName);
        });

        return { ...data, folderList: newFolderList };
    };

    const addFile = (data, folderId, newName) => {
        if (data.id === folderId) {
            data?.fileList?.unshift(newName);

            return data;
        }

        let newFolderList;

        newFolderList = data?.folderList?.map((folder) => {
            return addFile(folder, folderId, newName);
        });

        return { ...data, folderList: newFolderList };
    };

    const handleAddFolder = (folderId, newName) => {
        const tree = addFolder(fileData, folderId, newName);

        setFileData(tree);
    };

    const handleAddFile = (folderId, newName) => {
        const tree = addFile(fileData, folderId, newName);

        setFileData(tree);
    };

    return (
        <Folder
            data={fileData}
            addFolder={handleAddFolder}
            addFile={handleAddFile}
        />
    );
}

export default FileExplorer;
