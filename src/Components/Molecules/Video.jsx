function Video({src}){ 
    return(
        <div className="h-[400px] w-[400px]">
            <video src={src} controls>
                Your browser does not support video tag
            </video>
        </div>
    )
}
export default Video;