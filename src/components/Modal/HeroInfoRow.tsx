const HeroInfoRow = ({
    field,
    value,
    isLongTextField = false,
} : {
    field: string;
    value: string | number | boolean;
    isLongTextField?: boolean;
}) => {
    const newValue = (typeof value === 'number' || typeof value === 'boolean') ? value.toString() : value;
    const newField = field.replace('_', ' ');
    return (
        <div className="row spacebetween margin-bottom">
            {!isLongTextField && (
                <span>{`${newField}:`}</span>
            )}
            <div dangerouslySetInnerHTML={{__html: newValue}}/>
        </div>
    );
}

export default HeroInfoRow;
