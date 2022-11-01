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
    const upperCaseField = `${newField.charAt(0).toUpperCase()}${newField.substring(1)}`;

    return (
        <div className="row spacebetween margin-bottom">
            {!isLongTextField && (
                <span
                    className="bold-font"
                >
                    {upperCaseField}
                </span>
            )}
            <div
                data-testid="modal-hero-info"
                dangerouslySetInnerHTML={{__html: newValue}}
            />
        </div>
    );
}

export default HeroInfoRow;
