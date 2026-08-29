import { useState } from "react";



function Filess(){

    const [files, setFiles] = useState([]);

    function handleFileChange(event){
        setFiles(Array.from(event.target.files));
    }

    return (
        <>
        <input type="file" id="fileInput" multiple onChange={handleFileChange} className="hidden" />
        <button
        onClick={()=>document.getElementById("fileInput").click()} 
        className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">

            {files.length > 0 && (
            <div className="absolute left-14/9 top-33 h-52 w-125 -translate-x-1/2 overflow-y-auto rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
            
            {files.map((file, index) => (
            <div key={index} className="mb-2 rounded-lg bg-white/10 px-4 py-2">
                {file.name}
            </div>
            ))}
            </div>
            )}
        
        <div className="text-3xl">📄</div>
        Files
        </button>
        </>
    );
}

export default Filess;