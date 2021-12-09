const Error = props => {
    const {message = null} = props;
    return <div className="text-red-800">{message || 'Something went wrong!'}</div>
};

export default Error;