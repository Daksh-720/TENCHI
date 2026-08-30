function Image({ activeMode, setActiveMode, setFiles }){
    function handleImageChange(event){
        setFiles(Array.from(event.target.files));
        setActiveMode("image");
    }


    return(
        <>
        <input type="image" id="imageInput" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
        <button
        onClick={() => document.getElementById("imageInput").click()}
        className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
        <div className="text-3xl">🖼️</div>
        Image
        </button>
        </>
    );
}

export default Image