function Filess({ activeMode, setActiveMode, files, setFiles }){
    function handleFileChange(event){
        setFiles(Array.from(event.target.files));
        setActiveMode("files");
    }

    return (
        <>
        <input type="file" id="fileInput" multiple onChange={handleFileChange} className="hidden" />
        <button
        onClick={() => document.getElementById("fileInput").click()}
        className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
            <div className="text-3xl">📄</div>
            Files
        </button>
        </>
    );
}
export default Filess;