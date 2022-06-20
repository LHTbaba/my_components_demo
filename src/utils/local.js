const setToken = function (token) {
    if (token) {
        localStorage.setItem('token', JSON.stringify(token));
    } else {
        localStorage.removeItem('token');
    }
};
const getToken = function () {
    const token = localStorage.getItem('token');
    if (token) {
        return token
    } else {
        return ''
    }
};

const removeToken = function () {
    localStorage.removeItem('token');
};
const setRefreshToken = function (refreshtoken) {
    if (refreshtoken) {
        localStorage.setItem('refreshtoken', JSON.stringify(refreshtoken));
    } else {
        localStorage.removeItem('refreshtoken');
    }
};
const getRefreshToken = function () {
    const refreshtoken = localStorage.getItem('refreshtoken');
    if (refreshtoken) {
        return JSON.parse(refreshtoken)
    } else {
        return ''
    }
};

const removeRefreshToken = function () {
    localStorage.removeItem('refreshtoken');
};
const setLogin = function (isLogin) {
    if (isLogin) {
        sessionStorage.setItem('isLogin', JSON.stringify(isLogin))
    } else {
        localStorage.removeItem('isLogin')
    }
};
const getLogin = function () {
    const loginInfo = sessionStorage.getItem('isLogin');
    if (loginInfo) {
        return JSON.parse(loginInfo)
    } else {
        return ''
    }
};
const setUserName = function (usename) {
    if (usename) {
        localStorage.setItem('usename', JSON.stringify(usename))
    } else {
        localStorage.removeItem('usename')
    }
};
const getUserName = function () {
    const loginInfo = localStorage.getItem('usename');
    if (loginInfo) {
        return JSON.parse(loginInfo)
    } else {
        return ''
    }
};
const setLoginName = function (loginName) {
    if (loginName) {
        localStorage.setItem('loginName', JSON.stringify(loginName))
    } else {
        localStorage.removeItem('loginName')
    }
};
const getLoginName = function () {
    const loginInfo = localStorage.getItem('loginName');
    if (loginInfo) {
        return JSON.parse(loginInfo)
    } else {
        return ''
    }
};
const setAreaName = function (areaName) {
    if (areaName) {
        localStorage.setItem('areaName', JSON.stringify(areaName))
    } else {
        localStorage.removeItem('areaName')
    }
};
const getAreaName = function () {
    const loginInfo = localStorage.getItem('areaName');
    if (loginInfo) {
        return JSON.parse(loginInfo)
    } else {
        return ''
    }
};
const setPwd = function (pwd) {
    if (pwd) {
        localStorage.setItem('pwd', JSON.stringify(pwd))
    } else {
        localStorage.removeItem('pwd')
    }
};
const getPwd = function () {
    const loginInfo = localStorage.getItem('pwd');
    if (loginInfo) {
        return JSON.parse(loginInfo)
    } else {
        return ''
    }
};
const setCardNo = function (cardNo) {
    if (cardNo) {
        localStorage.setItem('cardNo', JSON.stringify(cardNo))
    } else {
        localStorage.removeItem('cardNo')
    }
};
const getCardNo = function () {
    const getCardNo = localStorage.getItem('cardNo');
    if (getCardNo) {
        return JSON.parse(getCardNo)
    } else {
        return ''
    }
};
const setDeptId = function (DeptId) {
    if (DeptId) {
        localStorage.setItem('deptId', JSON.stringify(DeptId))
    } else {
        localStorage.removeItem('deptId')
    }
    localStorage.setItem('deptId', JSON.stringify(DeptId))
};
const getDeptId = function () {
    const getDeptId = localStorage.getItem('deptId');
    if (getDeptId) {
        return JSON.parse(getDeptId)
    } else {
        return ''
    }
};
const setMail = function (mail) {
    if (mail) {
        localStorage.setItem('mail', JSON.stringify(mail))
    } else {
        localStorage.removeItem('mail')
    }
    localStorage.setItem('mail', JSON.stringify(mail))
};
const getMail = function () {
    const getMail = localStorage.getItem('mail');
    if (getMail) {
        return JSON.parse(getMail)
    } else {
        return ''
    }
};
const setOrganizationId = function (organizationId) {
    if (organizationId) {
        localStorage.setItem('organizationId', JSON.stringify(organizationId))
    } else {
        localStorage.removeItem('organizationId')
    }
    localStorage.setItem('organizationId', JSON.stringify(organizationId))
};
const getOrganizationId = function () {
    const organizationId = localStorage.getItem('organizationId');
    return JSON.parse(organizationId)

};
const setPhone = function (phone) {
    if (phone) {
        localStorage.setItem('phone', JSON.stringify(phone))
    } else {
        localStorage.removeItem('phone')
    }
    localStorage.setItem('phone', JSON.stringify(phone))
};
const getPhone = function () {
    const phone = localStorage.getItem('phone');
    return JSON.parse(phone)
};
const setUserId = function (userId) {
    if (userId) {
        localStorage.setItem('userId', JSON.stringify(userId))
    } else {
        localStorage.removeItem('userId')
    }
    localStorage.setItem('userId', JSON.stringify(userId))
};
const getUserId = function () {
    const userId = localStorage.getItem('userId');
    return JSON.parse(userId)
};
const setOrgId = function (orgId) {
    localStorage.setItem('orgId', JSON.stringify(orgId))
};
const getOrgId = function () {
    const orgId = localStorage.getItem('orgId');
    return JSON.parse(orgId)
};
const setAreaCode = function (areaCode) {
    localStorage.setItem('areaCode', JSON.stringify(areaCode))
};
const getAreaCode = function () {
    const areaCode = localStorage.getItem('areaCode');
    return JSON.parse(areaCode)
};
const setRole = function (roles) {
    sessionStorage.setItem('roles', JSON.stringify(roles))
};
const getRole = function () {
    const areaCode = sessionStorage.getItem('roles');
    return JSON.parse(areaCode)
};
const setparentId = function (parentId) {
    sessionStorage.setItem('parentId', JSON.stringify(parentId))
};
const getparentId = function () {
    const parentId = sessionStorage.getItem('parentId');
    return JSON.parse(parentId)
};
const setchildrenId = function (childrenId) {
    sessionStorage.setItem('childrenId', JSON.stringify(childrenId))
};
const getchildrenId = function () {
    const childrenId = sessionStorage.getItem('childrenId');
    return JSON.parse(childrenId)
};
const setchildren2Id = function (children2Id) {
    sessionStorage.setItem('children2Id', JSON.stringify(children2Id))
};
// const getchildren2Id = function () {
//     const children2Id = sessionStorage.getItem('children2Id');
//     return JSON.parse(children2Id)
// };

const setchildren1Id = function (children1Id) {
    sessionStorage.setItem('children1Id', JSON.stringify(children1Id))
};
const getchildren1Id = function () {
    const children1Id = sessionStorage.getItem('children1Id');
    return JSON.parse(children1Id)
};

const setChildId = function (childId) {
    sessionStorage.setItem('childId', JSON.stringify(childId))
};
const getChildId = function () {
    const parentId = sessionStorage.getItem('childId');
    return JSON.parse(parentId)

};
export default {
    setToken,
    getToken,
    removeToken,
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    setLogin,
    getLogin,
    setUserName,
    getUserName,
    setLoginName,
    getLoginName,
    setAreaName,
    getAreaName,
    setPwd,
    getPwd,
    setCardNo,
    getCardNo,
    setDeptId,
    getDeptId,
    setMail,
    getMail,
    setOrganizationId,
    getOrganizationId,
    setPhone,
    getPhone,
    setUserId,
    getUserId,
    setOrgId,
    getOrgId,
    setAreaCode,
    getAreaCode,
    setRole,
    getRole,
    setparentId,
    getparentId,
    setChildId,
    getChildId,
    setchildrenId,
    getchildrenId,
    setchildren2Id,
    // getchildren2Id,
    setchildren1Id,
    getchildren1Id
}