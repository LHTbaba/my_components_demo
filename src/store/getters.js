const getters = {
	token: state => state.login.token, 
	roles: state => state.login.roleRules,
	parentId: state => state.login.parentId,
	childrenId: state => state.login.childrenId,
	children2Id: state => state.login.children2Id,
	children1Id: state => state.login.children1Id
}

export default getters
