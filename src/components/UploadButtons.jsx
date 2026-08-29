function UploadButtons(){
    return (
       <div className = "mt-20 flex justify-center gap-4">
        <button className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
        <div className="text-3x1">📄</div>
        Files
        </button>

        <button className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
        <div className="text-3x1">📁</div>
        Folder
        </button>

        <button className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
        <div className="text-3x1">🖼️</div>
        Image
        </button>

        <button className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
        <div className="text-3x1">🎥</div>
        Video
        </button>

        <button className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
        <div className="text-3x1">📝</div>
        Text
        </button>
        
       </div>
    );
}

export default UploadButtons