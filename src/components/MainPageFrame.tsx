const MainPageFrame = ({ children }:{
    children: React.ReactElement
}) => (
    <div className="row container">
        <div className="width15p"/>
        <div className="width70p">
            {children}
        </div>
        <div className="width15p"/>
    </div>
);

export default MainPageFrame;
