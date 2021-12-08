const UserPanel = props => {
    const { data, handleSelectUser, selectedUser } = props;
    const isSelected = selectedUser && selectedUser.node.id === data.node.id;
    return <div onClick={() => {
        handleSelectUser(data)
    }} className={`m-2 ${isSelected && 'border-4 border-indigo-600'}`}>
        <img src={data.node.avatarUrl} style={{ width: 90, height: 90 }} alt="user" />
        {data.node.login}
    </div>
}

export default UserPanel;