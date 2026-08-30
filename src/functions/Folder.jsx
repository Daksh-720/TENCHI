function Folder({ activeMode, setActiveMode, setFiles}){
    function handleFolderChange(event){
        setFiles(Array.from(event.target.files));
        setActiveMode("folder");
    }


    return (
        <>
        <input type="file" id="folderInput" webkitdirectory="" multiple onChange={handleFolderChange} className="hidden" />
        <button
        onClick={() => document.getElementById(folderInput).click()}
        className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
        <div className="text-3xl">📁</div>
        Folder
        </button>
        </>
    );
}

export default Folder