const CenterBox = ({
    children,
} : {
    children: React.ReactElement,
}) => (
    <div className="container center">
        {children}
    </div>
);

export default CenterBox;
