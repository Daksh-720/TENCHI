import SendRet from "./SendRet";
import SetExpiry from "./SetExpiry";


function ActivePanel({ activeMode, files, text, setText }) {
    if (!activeMode) return null;

    const fileModes = ["files", "folder", "image", "video"];

    return (
        <>
            {activeMode === "text" && (
                <textarea
                 value={text}
                 onChange={(e)=> setText(e.target.value)}
                 placeholder="Enter Text..."
                 className="absolute left-1/2 top-34 h-52 w-125 -translate-x-1/2 resize-none rounded-2xl border border-white/20 bg-white/10 p-5 text-white outline-none backdrop-blur-md placeholder:text-white/50 focus:border-white/40"
                />
            )}

            {fileModes.includes(activeMode) && (
                <div className="absolute left-1/2 top-34 h-52 w-125 -translate-x-1/2 overflow-y-auto rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <div key={index} className="mb-2 rounded-lg bg-white/10 px-4 py-2">
                                {activeMode === "folder" ? (file.webkitRelativePath || file.name) : file.name}
                            </div>
                        ))
                    ) : (
                        <div className="text-white/50">No files selected</div>
                    )}
                </div>
            )}

            <div className="absolute left-4/13 top-92 -translate-x-1/2">
                <SendRet text={text} />
            </div>
        </>
    );
}

export default ActivePanel;