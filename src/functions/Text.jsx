function Text() {
    return (
        <div className="flex w-full justify-center">
            <textarea
             className="h-52 w-full max-w-2xl resize-none rounded-2xl border border-white/20 bg-white/10 p-5 text-white outline-none backdrop-blur-md placeholder:text-white/50 focus:border-white/40"
             placeholder="Enter Text..."
            />
        </div>
    );
}
export default Text