const Form = ({ title, placeHolder = 'Enter your ' + title.toLowerCase() }) => {
    return (
        <div>
            <div className="text-white mb-1">{title}</div>
            <div className="bg-black2 text-black3 h-11 flex items-center rounded-xl">{placeHolder}</div>
        </div>
    )
}

export default Form;