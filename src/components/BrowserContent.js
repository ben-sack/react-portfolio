

function BrowserContent({title, copy}) {
    return (
        <div className="about-container" style={{width: '100%', position: 'relative', top: '-40px'}}>
            <h1 className="about-title" style={{
                fontSize: '9vh'
                
            }}>{title}</h1>
            <span style={{height: '10px', borderBottom: '2px solid black'}}></span>
            <div className="about-copy">
                {copy}
            </div>
      </div>
    );
};

export default BrowserContent;